import { useState, useMemo, useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SKILL_NODES, SKILL_EDGES, VB_DIMS } from '../lib/data';
import type { SkillNode, SkillEdge } from '../types';

const LAYER_LABELS = ['Foundations', 'Core CS', 'Specialization', 'Output'];
const NODE_R = 18;
const LABEL_OFFSET = NODE_R + 14;
const SUBLABEL_OFFSET = NODE_R + 25;

function getForwardSet(nodeId: string, edges: SkillEdge[]) {
  const forwardEdges = new Set<string>();
  const forwardNodes = new Set<string>([nodeId]);
  for (const e of edges) {
    if (e.from === nodeId) {
      forwardEdges.add(e.id);
      forwardNodes.add(e.to);
    }
  }
  return { forwardEdges, forwardNodes };
}

interface NodeProps {
  node: SkillNode;
  isHighlighted: boolean;
  isDimmed: boolean;
  onHover: (id: string | null) => void;
  gradId: string;
}

function NetworkNode({ node, isHighlighted, isDimmed, onHover, gradId }: NodeProps) {
  const opacity = isDimmed ? 0.2 : 1;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${node.label}${node.sublabel ? ': ' + node.sublabel : ''}`}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      {/* Glow ring when highlighted */}
      {isHighlighted && (
        <circle
          cx={node.x}
          cy={node.y}
          r={NODE_R + 6}
          fill={`url(#${gradId}-glow)`}
          opacity={0.6}
        />
      )}

      {/* Node circle */}
      <circle
        cx={node.x}
        cy={node.y}
        r={NODE_R}
        fill={isHighlighted ? 'var(--color-accent-dim)' : 'var(--color-bg-alt)'}
        stroke={isHighlighted ? 'var(--color-accent)' : 'var(--color-border-strong)'}
        strokeWidth={isHighlighted ? 2 : 1}
        opacity={opacity}
        style={{ transition: 'stroke 0.18s, fill 0.18s, opacity 0.18s' }}
      />

      {/* Labels BELOW the circle for legibility */}
      <text
        x={node.x}
        y={node.y + LABEL_OFFSET}
        textAnchor="middle"
        fontSize="10"
        fontFamily="IBM Plex Mono, monospace"
        fill={isHighlighted ? 'var(--color-accent)' : 'var(--color-ink-muted)'}
        opacity={opacity}
        style={{ userSelect: 'none', transition: 'fill 0.18s, opacity 0.18s' }}
      >
        {node.label}
      </text>
      {node.sublabel && (
        <text
          x={node.x}
          y={node.y + SUBLABEL_OFFSET}
          textAnchor="middle"
          fontSize="9"
          fontFamily="IBM Plex Mono, monospace"
          fill={isHighlighted ? 'var(--color-accent)' : 'var(--color-ink-faint)'}
          opacity={opacity}
          style={{ userSelect: 'none', transition: 'fill 0.18s, opacity 0.18s' }}
        >
          {node.sublabel}
        </text>
      )}
    </g>
  );
}

function NetworkSVG({ reduced }: { reduced: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const uid = useId().replace(/:/g, '');

  const { forwardEdges, forwardNodes } = useMemo(() => {
    if (!hovered) return { forwardEdges: new Set<string>(), forwardNodes: new Set<string>() };
    return getForwardSet(hovered, SKILL_EDGES);
  }, [hovered]);

  const hasHover = hovered !== null;

  return (
    <svg
      viewBox={`0 0 ${VB_DIMS.w} ${VB_DIMS.h}`}
      className="w-full"
      style={{ maxHeight: 480 }}
      aria-label="Interactive neural network skill graph. Hover nodes to see forward connections."
    >
      <defs>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-node`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-accent-dim)" />
          <stop offset="100%" stopColor="var(--color-bg-alt)" />
        </radialGradient>
      </defs>

      {/* Layer labels */}
      {LAYER_LABELS.map((label, i) => {
        const layerNodes = SKILL_NODES.filter(n => n.layer === i);
        const x = layerNodes[0]?.x ?? 0;
        return (
          <text
            key={label}
            x={x}
            y={22}
            textAnchor="middle"
            fontSize="9"
            fontFamily="IBM Plex Mono, monospace"
            fill="var(--color-ink-faint)"
            letterSpacing="1"
            style={{ userSelect: 'none' }}
          >
            {label.toUpperCase()}
          </text>
        );
      })}

      {/* Edges */}
      {SKILL_EDGES.map(edge => {
        const from = SKILL_NODES.find(n => n.id === edge.from);
        const to   = SKILL_NODES.find(n => n.id === edge.to);
        if (!from || !to) return null;

        const active  = forwardEdges.has(edge.id);
        const dimmed  = hasHover && !active;
        const opacity = dimmed ? 0.06 : active ? edge.weight * 0.9 : edge.weight * 0.25;

        return (
          <line
            key={edge.id}
            x1={from.x + NODE_R}
            y1={from.y}
            x2={to.x - NODE_R}
            y2={to.y}
            stroke={active ? 'var(--color-accent)' : 'var(--color-border-strong)'}
            strokeWidth={active ? edge.weight * 2.5 : edge.weight * 1.2}
            opacity={opacity}
            style={{ transition: reduced ? 'none' : 'stroke 0.2s, stroke-width 0.2s, opacity 0.2s' }}
          />
        );
      })}

      {/* Nodes */}
      {SKILL_NODES.map(node => {
        const isHighlighted = forwardNodes.has(node.id) && hasHover;
        const isDimmed = hasHover && !forwardNodes.has(node.id);
        return (
          <NetworkNode
            key={node.id}
            node={node}
            isHighlighted={isHighlighted}
            isDimmed={isDimmed}
            onHover={setHovered}
            gradId={`${uid}-node`}
          />
        );
      })}
    </svg>
  );
}

function MobileSkills() {
  const layers = [0, 1, 2, 3].map(i => ({
    label: LAYER_LABELS[i],
    nodes: SKILL_NODES.filter(n => n.layer === i),
  }));

  return (
    <div className="space-y-4">
      {layers.map((layer, li) => (
        <motion.div
          key={layer.label}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: li * 0.08 }}
          className="terminal-window"
        >
          <div className="window-titlebar">
            <div className="window-dot" />
            <span className="ml-2 tracking-widest uppercase text-xs">{layer.label}</span>
          </div>
          <div className="p-3 flex flex-wrap gap-2">
            {layer.nodes.map(n => (
              <span
                key={n.id}
                className="text-xs px-2.5 py-1.5 border border-border text-ink-muted font-mono hover:border-accent hover:text-accent transition-colors"
              >
                {n.label}{n.sublabel ? ` ${n.sublabel}` : ''}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function Skills() {
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="section-rule">
          <span>Skills</span>
          <span className="text-ink-faint">neural-net.svg</span>
        </div>

        <motion.div
          className="terminal-window"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="window-titlebar">
            <div className="window-dot bg-accent" />
            <div className="window-dot" />
            <div className="window-dot" />
            <span className="ml-2">knowledge-graph -- hover a node to trace forward pass</span>
          </div>

          {/* Desktop: SVG */}
          <div className="hidden sm:block p-4">
            <NetworkSVG reduced={!!reduced} />
          </div>

          {/* Mobile: card list */}
          <div className="sm:hidden p-3">
            <MobileSkills />
          </div>

          <div className="px-4 py-3 border-t border-border text-xs text-ink-faint font-mono">
            {SKILL_NODES.length} nodes, {SKILL_EDGES.length} weighted edges across 4 layers
          </div>
        </motion.div>
      </div>
    </section>
  );
}
