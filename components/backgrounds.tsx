"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider"

export function MultiLanguageMatrix({ opacity = 0.35 }: { opacity?: number }) {
  const { isLowPower, theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isLight = theme === "light"

  const characters = [
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン",
    "的一是不了在人有我他这个们中来上大为和国地到以说时要就出会可也你对生能而子那得于着下自之年过发后作里用道行所然家种事成方多经么去法学如都同现当没动面起看定天分还进好小部其些主样理心她本前开但因只从想实日军者意无力它与长把机十民第公此已工使情明性知全三又关点正业外将两高间由问很最重并物手应战向头文体政美相见被利什二等产或新己制身果加西斯月话合回特代内信表化老给世位次度门任常先海通教儿原东声提立及比员解水名真论处走义各入几口认条平系气题活尔更别打女变四神总何电数安少报才结反受目太量再感建务做接必场件计管期市直德资命山金指克许统区保至队形社便空决治展马科司五基眼书非则听白却界达光放强即像难且权思王象完设式色路记南品住告类求据程北边死张该交规万取拉格望觉术领共确传师观清今切院让识候带导争运笑飞风步改收根干造言联持组每济车亲极林服快办议往元英士证近失转夫令准布始怎呢存未远叫台单影具罗字爱击流备兵连调深商算质团集百需价花党华城石级整府离况亚请技际约首示企划火达",
    "가나다라마바사아자차카타파하갸냐댜랴먀뱌샤야쟈챠캬탸퍄햐거너더러머버서어저처커터퍼허겨녀뎌려며벼셔여져쳐켜텨펴혀고노도로모보소오조초코토포호교뇨됴료묘뵤쇼요죠쵸쿄툐표효구누두루무부수우주추쿠투푸후규뉴듀류뮤뷰슈유쥬츄큐튜퓨휴",
    "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя",
    "أبتثجحخدذرزسشصضطظعغفقكلمنهوي",
    "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω",
    "अआइईउऊऋएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह",
    "01001010101110001111000011110000ABCDEFabcdef",
    "!@#$%^&*()[]{}|;:,.<>?/~`+-=_",
  ].join("")

  useEffect(() => {
    if (isLowPower) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    for (let i = 0; i < drops.length; i++) {
      drops[i] = Math.floor(Math.random() * -100)
    }

    const primaryColor = isLight ? "rgba(185, 28, 28, 1)" : "rgba(255, 45, 85, 1)"
    const secondaryColor = isLight ? "rgba(124, 58, 237, 1)" : "rgba(191, 90, 242, 1)"
    const fadeColor = isLight ? "rgba(250, 249, 248, 0.03)" : "rgba(10, 10, 15, 0.03)"

    const draw = () => {
      ctx.fillStyle = fadeColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillStyle = i % 3 === 0 ? secondaryColor : primaryColor
        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = Math.floor(Math.random() * -20)
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resize)
    }
  }, [isLowPower, isLight, characters])

  if (isLowPower) return null

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity }} />
}

export function MatrixRain({ opacity = 0.35 }: { opacity?: number }) {
  return <MultiLanguageMatrix opacity={opacity} />
}

export function GridBackground() {
  return null
}

export function NeuralNetworkBackground() {
  return null
}

export function CyberCityBackground() {
  return null
}

export function WorldMapBackground() {
  return null
}
