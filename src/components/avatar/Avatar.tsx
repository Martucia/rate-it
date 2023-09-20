import styles from './Avatar.module.sass';

import avatar from '@images/avatar.png'

interface CircleProps {
    colour: any,
    pct?: any
}

interface AvatarProps {
    percentage: any,
    size: any
}

const cleanPercentage = (percentage: number) => {
    const tooLow = !Number.isFinite(+percentage) || percentage < 0;
    const tooHigh = percentage > 100;
    return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const setColor = (percentage: number) => {
    if (percentage < 80) {
        return "#007BFF";
    } else {
        return "#38C976";
    }
}

const Circle = ({ colour, pct }: CircleProps) => {
    const r = 18;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - pct) * circ) / 100;

    return (
        <circle
            r={r}
            cx={0}
            cy={0}
            fill="transparent"
            stroke={strokePct !== circ ? colour : ""}
            strokeWidth={"3px"}
            strokeDasharray={circ}
            strokeDashoffset={pct ? strokePct : 0}
            strokeLinecap="round"
        />
    );
};

const Image = () => {
    return (
        <div className={styles.image}>
            <img src={avatar} alt="avatar" />
        </div>
    );
};

const Avatar = ({ percentage, size }: AvatarProps) => {
    const pct = cleanPercentage(percentage);
    const color = setColor(percentage);

    return (
        <div className={styles.avatar}>
            <svg width={size + "px"} height={size + "px"}>
                <g transform={`rotate(-90 ${size / 2 + " 0"})`}>
                    <Circle colour="lightgrey" />
                    <Circle colour={color} pct={pct} />
                </g>
            </svg>
            <Image />
            <div className={styles.count}>
                5
            </div>
        </div>

    );
};

export default Avatar;