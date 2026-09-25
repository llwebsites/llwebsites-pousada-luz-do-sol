import type { SceneVariant } from "@/lib/gallery";

type Props = {
  variant: SceneVariant;
  seed?: number;
  label: string;
  animated?: boolean;
  className?: string;
};

const SKY = "#DCE7EB";
const MIST = "#E6EDF0";
const PINE = "#1D5C4E";
const PINE_MID = "#3B7A6B";
const HILL_FAR = "#86A99E";
const HILL_NEAR = "#5C8A7C";
const GROUND = "#2E6A57";
const WALL = "#F7F9FA";
const ROOF = "#A8523D";
const INK = "#10222B";
const GLASS = "#BFD3DB";
const STONE = "#C9D3D8";
const WATER = "#5BA3C4";

function Cloud({ x, y, s = 1, cls }: { x: number; y: number; s?: number; cls?: string }) {
  return (
    <g className={cls} transform={`translate(${x} ${y}) scale(${s})`} fill="#fff" opacity="0.9">
      <ellipse cx="0" cy="0" rx="46" ry="16" />
      <ellipse cx="-22" cy="-10" rx="24" ry="14" />
      <ellipse cx="18" cy="-13" rx="28" ry="16" />
    </g>
  );
}

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-4" y="0" width="8" height="34" fill="#4A3B33" />
      <circle cx="0" cy="-8" r="30" fill="#1F5A48" />
      <circle cx="-18" cy="6" r="20" fill="#2A6C57" />
      <circle cx="18" cy="6" r="20" fill="#2A6C57" />
    </g>
  );
}

function Fachada({ animated }: { animated: boolean }) {
  return (
    <>
      <rect width="800" height="600" fill={SKY} />
      <circle cx="640" cy="120" r="70" fill="#fff" opacity="0.28" className={animated ? "anim-pulse" : ""} />
      <circle cx="640" cy="120" r="44" fill="#fff" />
      <Cloud x={160} y={110} s={1.1} cls={animated ? "anim-drift" : ""} />
      <Cloud x={470} y={70} s={0.8} cls={animated ? "anim-drift-slow" : ""} />
      <polygon points="0,380 140,250 260,340 400,220 560,350 700,270 800,360 800,600 0,600" fill={HILL_FAR} />
      <polygon points="0,430 200,320 340,400 520,300 800,420 800,600 0,600" fill={HILL_NEAR} />
      <rect y="470" width="800" height="130" fill={GROUND} />
      <polygon points="372,490 428,490 540,600 260,600" fill={STONE} />
      <rect x="190" y="300" width="420" height="190" fill={WALL} />
      <polygon points="166,304 400,212 634,304" fill={ROOF} />
      <rect x="190" y="470" width="420" height="20" fill="#DDE5E9" />
      {[226, 496].map((x) => (
        <g key={x}>
          <rect x={x} y="340" width="78" height="74" rx="4" fill={INK} />
          <rect x={x + 6} y="346" width="30" height="62" fill={GLASS} />
          <rect x={x + 42} y="346" width="30" height="62" fill={GLASS} />
        </g>
      ))}
      <rect x="372" y="392" width="56" height="98" rx="4" fill={INK} />
      <rect x="378" y="398" width="44" height="86" fill={PINE_MID} opacity="0.55" />
      <rect x="336" y="336" width="128" height="28" rx="6" fill={PINE} />
      <circle cx="400" cy="350" r="7" fill="#fff" />
      <Tree x={110} y={440} s={1.1} />
      <Tree x={700} y={436} s={1.2} />
      <Tree x={64} y={470} s={0.8} />
    </>
  );
}

function Quarto() {
  return (
    <>
      <rect width="800" height="600" fill={MIST} />
      <rect y="440" width="800" height="160" fill="#B9C7CE" />
      <rect x="70" y="110" width="170" height="200" rx="6" fill={INK} />
      <rect x="80" y="120" width="72" height="180" fill={GLASS} />
      <rect x="158" y="120" width="72" height="180" fill={GLASS} />
      <polygon points="80,300 152,120 152,300" fill="#fff" opacity="0.25" />
      <rect x="290" y="130" width="230" height="130" rx="6" fill="#fff" stroke={STONE} strokeWidth="6" />
      <polygon points="300,250 380,180 430,225 470,195 512,250" fill={HILL_NEAR} />
      <circle cx="470" cy="165" r="16" fill="#fff" stroke={STONE} />
      <rect x="240" y="250" width="420" height="150" rx="10" fill={PINE} />
      <rect x="220" y="340" width="460" height="120" rx="14" fill="#fff" />
      <rect x="220" y="392" width="460" height="70" rx="12" fill={PINE_MID} />
      <rect x="260" y="318" width="120" height="42" rx="18" fill="#EEF3F5" stroke={STONE} />
      <rect x="520" y="318" width="120" height="42" rx="18" fill="#EEF3F5" stroke={STONE} />
      <rect x="220" y="462" width="14" height="30" fill="#4A3B33" />
      <rect x="666" y="462" width="14" height="30" fill="#4A3B33" />
      <rect x="700" y="360" width="60" height="100" rx="6" fill="#4A3B33" />
      <rect x="716" y="300" width="28" height="60" rx="4" fill={INK} />
      <circle cx="730" cy="290" r="26" fill="#fff" stroke={STONE} strokeWidth="3" />
    </>
  );
}

function Piscina({ animated }: { animated: boolean }) {
  return (
    <>
      <rect width="800" height="600" fill={SKY} />
      <Cloud x={200} y={90} cls={animated ? "anim-drift" : ""} />
      <polygon points="0,260 150,170 300,240 470,140 640,230 800,180 800,330 0,330" fill={HILL_FAR} />
      <rect y="300" width="800" height="300" fill={STONE} />
      <rect x="90" y="360" width="620" height="190" rx="22" fill="#fff" />
      <rect x="106" y="376" width="588" height="158" rx="14" fill={WATER} />
      <g clipPath="url(#poolclip)">
        <g className={animated ? "anim-ripple" : ""} fill="none" stroke="#fff" strokeWidth="3" opacity="0.7">
          {[410, 450, 490].map((y) => (
            <path key={y} d={`M80 ${y} q20 -12 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0`} />
          ))}
        </g>
      </g>
      <defs>
        <clipPath id="poolclip">
          <rect x="106" y="376" width="588" height="158" rx="14" />
        </clipPath>
      </defs>
      <g transform="translate(40 320)">
        <rect width="70" height="14" rx="6" fill="#fff" />
        <rect x="0" y="14" width="6" height="16" fill={INK} />
        <rect x="64" y="14" width="6" height="16" fill={INK} />
      </g>
      <g transform="translate(690 330)">
        <rect x="0" y="-70" width="6" height="74" fill={INK} />
        <path d="M-40 -70 a46 30 0 0 1 92 0 z" fill={PINE} />
      </g>
      <Tree x={60} y={250} s={0.9} />
      <Tree x={750} y={240} s={0.9} />
    </>
  );
}

function Cafe({ animated }: { animated: boolean }) {
  return (
    <>
      <rect width="800" height="600" fill={MIST} />
      <rect x="0" y="0" width="800" height="230" fill={SKY} />
      <rect x="60" y="40" width="200" height="150" rx="6" fill="#fff" stroke={STONE} strokeWidth="6" />
      <polygon points="70,180 130,110 170,150 210,120 250,180" fill={HILL_NEAR} />
      <rect y="230" width="800" height="370" fill="#8A5A44" />
      <rect y="230" width="800" height="12" fill="#6F4634" />
      <g>
        <circle cx="210" cy="400" r="88" fill="#fff" />
        <circle cx="210" cy="400" r="62" fill="#EEF3F5" />
        <ellipse cx="186" cy="392" rx="30" ry="18" fill="#C58B5A" />
        <ellipse cx="238" cy="410" rx="24" ry="14" fill="#B0764A" />
      </g>
      <g>
        <circle cx="440" cy="440" r="70" fill="#fff" />
        <circle cx="440" cy="440" r="48" fill="#EEF3F5" />
        <circle cx="426" cy="432" r="14" fill={PINE_MID} />
        <circle cx="456" cy="446" r="12" fill="#A8523D" />
      </g>
      <g transform="translate(600 360)">
        <ellipse cx="60" cy="110" rx="90" ry="26" fill="#fff" />
        <path d="M-6 30 h132 v70 a66 30 0 0 1 -132 0 z" fill="#fff" stroke={STONE} strokeWidth="4" />
        <path d="M126 50 q40 0 40 34 t-40 34" fill="none" stroke="#fff" strokeWidth="10" />
        <path d="M60 0 q-16 -20 0 -38" className={animated ? "anim-bob" : ""} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
        <path d="M90 6 q-16 -20 0 -38" className={animated ? "anim-bob" : ""} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
        <ellipse cx="60" cy="34" rx="60" ry="10" fill="#4A3B33" />
      </g>
      <g transform="translate(300 300)">
        <path d="M0 0 h130 l-14 80 h-102 z" fill="#C58B5A" />
        <ellipse cx="65" cy="0" rx="65" ry="12" fill="#D9A26F" />
      </g>
    </>
  );
}

function Gourmet({ animated }: { animated: boolean }) {
  return (
    <>
      <rect width="800" height="600" fill={SKY} />
      <rect y="440" width="800" height="160" fill={STONE} />
      <rect x="0" y="120" width="800" height="14" fill="#4A3B33" />
      {[80, 240, 400, 560, 720].map((x) => (
        <rect key={x} x={x} y="120" width="10" height="330" fill="#4A3B33" />
      ))}
      <path d="M0 150 q100 40 200 0 t200 0 t200 0 t200 0" fill="none" stroke={INK} strokeWidth="3" />
      {[50, 150, 250, 350, 450, 550, 650, 750].map((x, i) => (
        <circle key={x} cx={x} cy={i % 2 ? 176 : 170} r="9" fill="#fff" className={animated ? "anim-pulse" : ""} />
      ))}
      <rect x="470" y="250" width="220" height="200" fill="#8C9BA3" />
      <rect x="470" y="250" width="220" height="16" fill={INK} />
      <rect x="500" y="290" width="160" height="70" rx="6" fill={INK} />
      {[520, 550, 580, 610, 640].map((x) => (
        <rect key={x} x={x} y="298" width="6" height="54" fill="#5E6D75" />
      ))}
      <rect x="560" y="180" width="40" height="72" fill="#8C9BA3" />
      <g transform="translate(90 350)">
        <rect x="0" y="0" width="300" height="20" rx="6" fill="#8A5A44" />
        <rect x="24" y="20" width="14" height="90" fill="#6F4634" />
        <rect x="262" y="20" width="14" height="90" fill="#6F4634" />
        <rect x="20" y="-50" width="60" height="16" rx="5" fill={PINE} />
        <rect x="28" y="-34" width="10" height="40" fill={PINE} />
        <rect x="220" y="-50" width="60" height="16" rx="5" fill={PINE} />
        <rect x="262" y="-34" width="10" height="40" fill={PINE} />
        <circle cx="150" cy="-10" r="18" fill="#fff" />
      </g>
      <Tree x={40} y={400} s={0.9} />
    </>
  );
}

function Cachoeira({ animated }: { animated: boolean }) {
  return (
    <>
      <rect width="800" height="600" fill={SKY} />
      <Cloud x={560} y={90} s={0.9} cls={animated ? "anim-drift" : ""} />
      <polygon points="0,300 120,190 240,270 360,150 460,240 600,170 800,290 800,600 0,600" fill={HILL_FAR} />
      <polygon points="0,380 160,270 280,340 340,300 340,600 0,600" fill="#3E6459" />
      <polygon points="800,360 660,250 540,330 460,300 460,600 800,600" fill="#3E6459" />
      <rect x="340" y="270" width="120" height="240" fill="#fff" opacity="0.92" />
      {[365, 395, 425, 445].map((x) => (
        <line key={x} x1={x} y1="276" x2={x} y2="506" stroke={WATER} strokeWidth="5" opacity="0.5" className={animated ? "anim-flow" : ""} />
      ))}
      <ellipse cx="400" cy="520" rx="200" ry="52" fill={WATER} />
      <ellipse cx="400" cy="514" rx="130" ry="28" fill="#fff" opacity="0.5" />
      <rect y="540" width="800" height="60" fill="#2A5548" />
      <Tree x={90} y={430} s={1.1} />
      <Tree x={710} y={440} s={1.1} />
    </>
  );
}

export function Scene({ variant, seed = 0, label, animated = false, className }: Props) {
  const ox = (seed % 3) * 40;
  const oy = (seed % 2) * 30;
  const vb = `${ox} ${oy} ${800 - ox} ${600 - oy}`;
  return (
    <svg
      viewBox={vb}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === "fachada" && <Fachada animated={animated} />}
      {variant === "quarto" && <Quarto />}
      {variant === "piscina" && <Piscina animated={animated} />}
      {variant === "cafe" && <Cafe animated={animated} />}
      {variant === "gourmet" && <Gourmet animated={animated} />}
      {variant === "cachoeira" && <Cachoeira animated={animated} />}
    </svg>
  );
}
