"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Button, buttonVariants } from "./ui/button"
import { FormNewsletter } from "./form-newsletter"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { inputVariants } from "./ui/input"
import { useIsV0 } from "@/lib/context"

const DURATION = 0.3
const DELAY = DURATION
const EASE_OUT = "easeOut"
const EASE_OUT_OPACITY = [0.25, 0.46, 0.45, 0.94] as const

export const Newsletter = () => {
  const isInitialRender = useRef(true)

  return (
    <div className="flex overflow-hidden relative flex-col gap-4 justify-center items-center pt-10 w-full h-full short:lg:pt-10 pb-footer-safe-area 2xl:pt-footer-safe-area px-sides short:lg:gap-4 lg:gap-8">
      <motion.div layout="position" transition={{ duration: DURATION, ease: EASE_OUT }}>
        <h1 className="font-serif text-5xl italic short:lg:text-8xl sm:text-8xl lg:text-9xl text-foreground">
          Carlos Freire
        </h1>
      </motion.div>

      <div className="flex flex-col items-center min-h-0 shrink">
        <AnimatePresenceGuard>
          <motion.div
            key="newsletter"
            initial={isInitialRender.current ? false : "hidden"}
            animate="visible"
            exit="exit"
            variants={{
              visible: {
                scale: 1,
                transition: {
                  delay: DELAY,
                  duration: DURATION,
                  ease: EASE_OUT,
                },
              },
              hidden: {
                scale: 0.9,
                transition: { duration: DURATION, ease: EASE_OUT },
              },
              exit: {
                y: -150,
                scale: 0.9,
                transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
              },
            }}
          >
            <div className="flex flex-col gap-4 w-full max-w-xl md:gap-6 lg:gap-8">
              <FormNewsletter
                input={(props) => (
                  /* @ts-expect-error - Type mismatch */
                  <motion.input
                    autoCapitalize="off"
                    autoComplete="email"
                    placeholder="Ingresa tu email"
                    className={inputVariants()}
                    initial={isInitialRender.current ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: DURATION,
                        ease: EASE_OUT_OPACITY,
                      },
                    }}
                    transition={{
                      duration: DURATION,
                      ease: EASE_OUT,
                      delay: DELAY,
                    }}
                    {...props}
                  />
                )}
                submit={(props) => (
                  /* @ts-expect-error - Type mismatch */
                  <motion.button
                    className={buttonVariants({
                      variant: "iconButton",
                      size: "icon-xl",
                    })}
                    {...props}
                    initial={isInitialRender.current ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: DURATION,
                        ease: EASE_OUT_OPACITY,
                      },
                    }}
                    transition={{
                      duration: DURATION,
                      ease: EASE_OUT,
                      delay: DELAY,
                    }}
                  >
                    <ArrowRightIcon className="w-4 h-4 text-current" />
                  </motion.button>
                )}
              />
              <motion.p
                initial={isInitialRender.current ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
                }}
                transition={{
                  duration: DURATION,
                  ease: EASE_OUT,
                  delay: DELAY,
                }}
                className="text-base short:lg:text-lg sm:text-lg lg:text-xl !leading-[1.1] font-medium text-center text-foreground text-pretty"
              >
                ¡Mantente actualizado con las últimas noticias y contenido exclusivo! Suscríbete a nuestro newsletter
                hoy y nunca te pierdas actualizaciones emocionantes.
              </motion.p>
            </div>
          </motion.div>

          {/* Espacio para texto adicional */}
          <div key="text-space" className="mt-8 max-w-2xl text-center">
            <p className="text-foreground/70 text-sm">
              {/* Aquí puedes agregar cualquier texto adicional que necesites */}
            </p>
          </div>
        </AnimatePresenceGuard>
      </div>
    </div>
  )
}

const AnimatePresenceGuard = ({ children }: { children: React.ReactNode }) => {
  const isV0 = useIsV0()

  return isV0 ? (
    <>{children}</>
  ) : (
    <AnimatePresence mode="popLayout" propagate>
      {children}
    </AnimatePresence>
  )
}
