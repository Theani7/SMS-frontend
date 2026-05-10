import { TrajectoryPoint } from '../types';

interface TrajectoryChartProps {
  data: TrajectoryPoint[];
}

export function TrajectoryChart({ data }: TrajectoryChartProps) {
  // Simple SVG chart implementation
  const height = 240;
  const width = 800;
  const padding = 40;
  
  // Calculate points
  const points = data.map((p, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    // Map GPA 3.0-4.0 to 180-40 height
    const y = height - padding - ((p.gpa - 3.0) / 1.0) * (height - padding * 2);
    return { x, y, ...p };
  });

  const actualPoints = points.filter(p => !p.projected);
  const projectedPoints = points.filter((p, i) => p.projected || (i > 0 && points[i-1].projected === undefined && points[i].projected));

  const actualPath = actualPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  
  // Projected path starts from the last actual point
  const lastActual = actualPoints[actualPoints.length - 1];
  const projectedPath = [`M ${lastActual.x} ${lastActual.y}`, ...projectedPoints.map(p => `L ${p.x} ${p.y}`)].join(' ');

  return (
    <div className="h-[240px] w-full relative group">
      {/* Grid Lines */}
      <div className="absolute inset-0 flex flex-col justify-between py-[40px]">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-px w-full bg-slate-50 dark:bg-slate-800/50" />
        ))}
      </div>

      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="absolute inset-0 h-full w-full overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Actual Path */}
        <path 
          d={actualPath} 
          fill="none" 
          stroke="#6366f1" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        
        {/* Projected Path */}
        <path 
          d={projectedPath} 
          fill="none" 
          stroke="#e2e8f0" 
          strokeWidth="3" 
          strokeDasharray="6,6"
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="dark:stroke-slate-700"
        />

        {/* Data Points */}
        {actualPoints.map((p, i) => (
          <g key={i}>
            <circle 
              cx={p.x} 
              cy={p.y} 
              r="4" 
              fill="white" 
              stroke="#6366f1" 
              strokeWidth="2" 
              className="dark:fill-slate-900"
            />
            {i === actualPoints.length - 1 && (
              <circle cx={p.x} cy={p.y} r="6" fill="#6366f1" />
            )}
          </g>
        ))}
      </svg>

      {/* X-Axis Labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-[30px]">
        {data.map((_, i) => (
          <span key={i} className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
            W{i+1}
          </span>
        ))}
      </div>
    </div>
  );
}
