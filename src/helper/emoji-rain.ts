import { onUnmounted, ref, isRef, type Ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'

export interface EmojiRainOptions {
  emojis?: string[] | Ref<string[]>
  spawnInterval?: number // ms between new emojis
  minSize?: string // CSS size, e.g. '1rem'
  maxSize?: string // CSS size, e.g. '2.5rem'
  fallDuration?: number // ms to fall from top → bottom
  maxDrift?: number // max horizontal drift in vw
  wobbleMinAngle?: number // deg
  wobbleMaxAngle?: number // deg
  wobbleDurationMin?: number // ms
  wobbleDurationMax?: number // ms
  wobbleEasing?: string // any valid CSS easing function
}

export const defaultEmojis = [
  '🤑',
  '👋',
  '🚬',
  '🚽',
  '⏳',
  '💰',
  '💲',
  '💵',
  '💸',
  '💩',
]

export function useEmojiRain({
  emojis: rawEmojis = defaultEmojis,
  spawnInterval = 200,
  minSize = '1rem',
  maxSize = '4rem',
  fallDuration = 5000,
  maxDrift = 20,
  wobbleMinAngle = -20,
  wobbleMaxAngle = 20,
  wobbleDurationMin = 500,
  wobbleDurationMax = 1000,
  wobbleEasing = 'ease-in-out',
}: EmojiRainOptions = {}) {
  const cssInjected = ref(false)
  const emojis: Ref<string[]> = isRef(rawEmojis)
    ? rawEmojis
    : ref<string[]>([...rawEmojis])

  function randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  function injectCSS() {
    if (cssInjected.value) {
      return
    }

    const style = document.createElement('style')
    style.textContent = `
      .emoji {
        position: fixed;
        top: -2rem;
        pointer-events: none;
        user-select: none;
        will-change: left, top, transform;
        animation-fill-mode: forwards;
        z-index: 3000;
      }
      @keyframes fall {
        to { top: 100vh; }
      }
      @keyframes sway {
        from { left: var(--start-left); }
        to   { left: calc(var(--start-left) + var(--drift)); }
      }
      @keyframes wobble {
        from { transform: rotate(var(--wobble-start)); }
        to   { transform: rotate(var(--wobble-end)); }
      }
    `
    document.head.appendChild(style)
    cssInjected.value = true
  }

  function spawnEmoji() {
    const choices = emojis.value
    const char = choices[Math.floor(Math.random() * choices.length)]

    if (!char) {
      return
    }

    const span = document.createElement('span')
    span.className = 'emoji'
    span.textContent = char

    // 1) horizontal start
    const startX = randomBetween(0, 100)
    span.style.setProperty('--start-left', `${startX}vw`)
    span.style.left = `${startX}vw`

    // 2) drift amount
    const drift = randomBetween(-maxDrift, maxDrift)
    span.style.setProperty('--drift', `${drift}vw`)

    // 3) size
    const min = parseFloat(minSize)
    const max = parseFloat(maxSize)
    const unit = minSize.replace(/[0-9.]/g, '')
    const size = `${randomBetween(min, max).toFixed(2)}${unit}`
    span.style.fontSize = size

    // 4) opacity (depth)
    span.style.opacity = randomBetween(0.5, 1).toFixed(2)

    // 5) compute sway duration
    const swayDuration = fallDuration * randomBetween(0.75, 1.25)

    // 6) compute wobble start/end angles and duration
    const startAngle = `${randomBetween(wobbleMinAngle, wobbleMaxAngle).toFixed(1)}deg`
    const endAngle = `${randomBetween(wobbleMinAngle, wobbleMaxAngle).toFixed(1)}deg`
    span.style.setProperty('--wobble-start', startAngle)
    span.style.setProperty('--wobble-end', endAngle)

    const wobbleDuration = randomBetween(wobbleDurationMin, wobbleDurationMax)

    // 7) combine three animations
    span.style.animation = [
      `fall ${fallDuration}ms linear forwards`,
      `sway ${swayDuration.toFixed(0)}ms ease-in-out infinite alternate`,
      `wobble ${wobbleDuration.toFixed(0)}ms ${wobbleEasing} infinite alternate`,
    ].join(', ')

    document.body.appendChild(span)
    span.addEventListener('animationend', () => span.remove())
  }

  // useIntervalFn gives us pause/resume + isActive
  const { pause, resume, isActive } = useIntervalFn(spawnEmoji, spawnInterval, {
    immediate: false,
  })

  function start() {
    injectCSS()
    if (!isActive.value) {
      resume()
    }
  }

  function stop() {
    pause()
  }

  onUnmounted(stop)

  return {
    start,
    stop,
    isActive,
    emojis,
  }
}
