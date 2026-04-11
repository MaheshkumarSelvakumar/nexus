function XPBar({xp, level, title}) {

    const xpThresholds = [0, 100, 300, 600, 1000];
    const xpForNextLevel = xpThresholds[level] || 1000;
    const xpForCurrentLevel = xpThresholds[level - 1] || 0;
    const Percentage = Math.min(
        ((xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100,
        100
    );

    return (
        <div className="px-8 py-4 border-b border-[#00ff88]/20">

            <div className="flex justify-between items-center mb-2">
                <span className="text-[#00ff88] font-bold text-sm">
                    LVL {level} - {title}
                </span>
                <span className="text-[#00ff88]/60 text-sm font-mono">
                    {xp} / {xpForNextLevel} XP
                </span>
            </div>

            <div className="w-full h-4 bg-[#111118] rounded-full border border-[#00ff88]/30 p-0.5">
                <div 
                    className="h-full bg-[#00ff88] rounded-full transition-all duration-500"
                    style={{ 
                        width: `${Percentage}%`,
                        boxShadow: '0 0 10px #00ff88, 0 0 20px #00ff88'
                    }}
                />
            </div>
        </div>
    );
}

export default XPBar;