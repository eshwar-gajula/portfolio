"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"

interface Project {
  id: string
  name: string
  category: string
  description: string
}

interface NodeGraphProps {
  projects: Project[]
  onSelectProject: (id: string) => void
  selectedProject: string | null
}

interface Node {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  name: string
  category: string
}

export function NodeGraph({ projects, onSelectProject, selectedProject }: NodeGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = useState<Node[]>([])
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [focusedIndex, setFocusedIndex] = useState(0)
  const animationRef = useRef<number | null>(null)
  const isDraggingRef = useRef<string | null>(null)

  // Initialize nodes
  useEffect(() => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    setDimensions({ width: rect.width, height: rect.height })

    const initialNodes: Node[] = projects.map((p) => ({
      id: p.id,
      x: rect.width / 2 + (Math.random() - 0.5) * 300,
      y: rect.height / 2 + (Math.random() - 0.5) * 200,
      vx: 0,
      vy: 0,
      name: p.name,
      category: p.category,
    }))
    setNodes(initialNodes)
  }, [projects])

  // Simple force simulation
  useEffect(() => {
    if (nodes.length === 0) return

    const simulate = () => {
      setNodes((prevNodes) => {
        const newNodes = prevNodes.map((node) => ({ ...node }))

        // Apply forces
        newNodes.forEach((node, i) => {
          // Center force
          const dx = dimensions.width / 2 - node.x
          const dy = dimensions.height / 2 - node.y
          node.vx += dx * 0.001
          node.vy += dy * 0.001

          // Repulsion between nodes
          newNodes.forEach((other, j) => {
            if (i === j) return
            const ndx = node.x - other.x
            const ndy = node.y - other.y
            const dist = Math.sqrt(ndx * ndx + ndy * ndy) || 1
            if (dist < 150) {
              const force = ((150 - dist) / dist) * 0.5
              node.vx += ndx * force * 0.01
              node.vy += ndy * force * 0.01
            }
          })

          // Apply velocity with damping
          if (isDraggingRef.current !== node.id) {
            node.x += node.vx
            node.y += node.vy
            node.vx *= 0.9
            node.vy *= 0.9
          }

          // Keep in bounds
          node.x = Math.max(50, Math.min(dimensions.width - 50, node.x))
          node.y = Math.max(50, Math.min(dimensions.height - 50, node.y))
        })

        return newNodes
      })

      animationRef.current = requestAnimationFrame(simulate)
    }

    simulate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [nodes.length, dimensions])

  const handleMouseDown = useCallback((id: string) => {
    isDraggingRef.current = id
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setNodes((prev) => prev.map((node) => (node.id === isDraggingRef.current ? { ...node, x, y, vx: 0, vy: 0 } : node)))
  }, [])

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = null
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        setFocusedIndex((i) => (i + 1) % nodes.length)
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        setFocusedIndex((i) => (i - 1 + nodes.length) % nodes.length)
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        if (nodes[focusedIndex]) {
          onSelectProject(nodes[focusedIndex].id)
        }
      }
    },
    [nodes, focusedIndex, onSelectProject],
  )

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Security":
        return "#ff4757"
      case "Backend":
        return "#6ee7ff"
      case "Frontend":
        return "#00f5a0"
      default:
        return "#ff8c42"
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
      aria-label="Project node graph. Use arrow keys to navigate, Enter to select."
    >
      {/* Grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((other) => {
            const dist = Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2))
            if (dist > 200) return null
            return (
              <line
                key={`${node.id}-${other.id}`}
                x1={node.x}
                y1={node.y}
                x2={other.x}
                y2={other.y}
                stroke="var(--neon-primary)"
                strokeOpacity={0.2 * (1 - dist / 200)}
                strokeWidth={1}
              />
            )
          }),
        )}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute cursor-pointer"
          style={{
            left: node.x,
            top: node.y,
            transform: "translate(-50%, -50%)",
          }}
          onMouseDown={() => handleMouseDown(node.id)}
          onClick={() => onSelectProject(node.id)}
        >
          <div
            className={`
              relative p-4 rounded-lg border-2 transition-all
              ${
                selectedProject === node.id
                  ? "border-neon-primary bg-surface shadow-lg"
                  : "border-border bg-surface/80 hover:border-neon-primary/50"
              }
              ${focusedIndex === i ? "ring-2 ring-ring" : ""}
            `}
            style={{
              boxShadow: selectedProject === node.id ? "var(--glow-primary)" : undefined,
            }}
          >
            {/* Category indicator */}
            <div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
              style={{ backgroundColor: getCategoryColor(node.category) }}
            />

            <div className="text-sm font-semibold whitespace-nowrap">{node.name}</div>
            <div className="text-xs text-muted-foreground">{node.category}</div>
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-4 text-xs bg-surface/80 backdrop-blur p-3 rounded-lg border border-border">
        {["Security", "Backend", "Frontend"].map((cat) => (
          <div key={cat} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor(cat) }} />
            <span className="text-muted-foreground">{cat}</span>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-surface/80 backdrop-blur p-2 rounded border border-border">
        Drag nodes or use arrow keys + Enter
      </div>
    </div>
  )
}
