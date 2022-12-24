export default function HeroUnit(){
    return(
        <>
            <div id="hero-unit" className="hero-unit">

                <div className="">
                    <div className="flip-titles-container">
                        <p>大島武宜は</p>
                        <div className="flip-titles">
                            <div className="flip-title">コンポーザー</div>
                            <div className="flip-title">ギタリスト</div>
                            <div className="flip-title">デザイナー</div>
                            <div className="flip-title">音楽家</div>
                            <div className="flip-title">プログラマ</div>
                            <div className="flip-title">自由工作員</div>
                            <div className="flip-title">装丁家</div>
                            <div className="flip-title">歌うたい</div>
                            <div className="flip-title">電子工作家</div>
                        </div>
                        <p>です。</p>
                    </div>
                </div>

                <div className="hero-unit-scroll">
                    <small>Scroll</small>
                    <i className="bi-chevron-down"></i>
                </div>

            </div>
        </>
    )
}