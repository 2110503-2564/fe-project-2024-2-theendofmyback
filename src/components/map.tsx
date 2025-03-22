import style from './map.module.css';

export default function MapCard() {
  return (
    <div className={style["map-container"]}>
      <svg viewBox="0 0 800 500" className={style["map-background"]}>
        <rect style={{ fill: "#f5f0e5" }} width="800" height="500"></rect>
        <path
          style={{ fill: "#90daee" }}
          d="M 0 367.82 c 5.83 -4.39 14.42 -10.16 25.59 -15.34 c 4.52 -2.09 43.19 -19.51 79.55 -11.93 c 36.1 7.52 35.75 32.55 78.41 60.23 c 46.34 30.06 109.47 41.21 123.32 22.1 c 11.95 -16.49 -22.61 -41.92 -13.66 -84.6 c 4.85 -23.1 22.33 -50.71 47.73 -58.52 c 42.42 -13.05 78.83 39.45 102.84 23.86 c 15.81 -10.26 0.01 -32.87 22.73 -74.43 c 15.49 2.81 11.65 -21.15 11.93 -36.93 c 0.28 -15.69 21.56 -32.26 -7.95 -32.39 c -6.66 -16.45 -6.21 -45.15 115.51 -65.87 c 440.67 63.68 455.67 -177.32 375 505 H 0 v -132.18 Z"
        ></path>
      </svg>
      <div className={style["map-cities"]}>
        {[
          { x: 5, y: 67, icon: "🏖️", name: "Beach camp" },
          { x: 32, y: 32, icon: "🌷", name: "Flower camp", anim: "anim-grow" },
          { x: 28, y: 83, icon: "🏄", name: "Surf camp", anim: "anim-slidein" },
          { x: 45, y: 22, icon: "🏛️", name: "Capital camp" },
          { x: 87, y: 8, icon: "🎢", name: "Funland" },
          { x: 59, y:38, icon: "🌊", name: "Coast camp", anim: "anim-slidein" },
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
