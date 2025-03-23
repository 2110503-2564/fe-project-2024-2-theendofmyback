import style from './map.module.css';

export default function MapCard() {
  return (
    <div className={style["map-container"]}>
      <svg viewBox="0 0 1200 500" className={style["map-background"]}>

        <image href="/img/thaimap.png" width="1200" height="500" />
        
      </svg>
      <div className={style["map-cities"]}>
        {[
          { x: 20, y: 7, icon: "⛰️", name: "Mountain View" },
          { x: 10, y: 32, icon: "🌷", name: "Forest Haven", anim: "anim-grow" },
          { x: 61, y: 7, icon: "🌄", name: "Mountain Ridge", anim: "anim-slidein" },
          { x: 85, y: 22, icon: "🏛️", name: "Capital " },
          { x: 60, y: 47, icon: "🎢", name: "Funland" },
          { x: 96, y: 86, icon: "🌊", name: "Lakeside", anim: "anim-slidein" },
        ].map((camp, index) => (
          <div
            key={index}
            style={{ "--x": camp.x, "--y": camp.y } as React.CSSProperties}
            className={style["map-camp"]}
          >
            <div className={style["map-camp__label"]}>
              <span data-icon={camp.icon} className={`${style["map-camp__sign"]} ${camp.anim ? style[camp.anim] : ""}`}>
                {camp.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
