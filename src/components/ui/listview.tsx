interface ListViewProps {
    dogs: Array<Pet>
}

export default function ListView({ dogs }: ListViewProps) {
    return (
        <article className="view">
            {dogs.map((dog) => (
                <div className="card" key={dog.breed}>
                    <figure>
                        <img src={dog.image} />
                    </figure>

                    <div className="content">
                        <div className="top-row">
                            <h2>{dog.breed}</h2>
                            <div className="favorite">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 46" fill="none"> <g filter="url(#filter0_dd_6_99)"> <path d="M26.0203 21.0233C27.3266 19.645 27.3266 17.4119 26.0203 16.0337C24.714 14.6554 22.5973 14.6554 21.291 16.0337L20.9241 16.4208L20.709 16.1938C19.4027 14.8156 17.286 14.8156 15.9797 16.1938C14.6734 17.572 14.6734 19.8052 15.9797 21.1834L19.7618 25.1747C20.1661 25.6013 20.3682 25.8146 20.6038 25.894C20.8109 25.9638 21.0351 25.9638 21.2422 25.8941C21.4778 25.8147 21.6799 25.6015 22.0843 25.1749L26.0203 21.0233Z" fill="#FF4B33" /> <path d="M26.0203 21.0233C27.3266 19.645 27.3266 17.4119 26.0203 16.0337C24.714 14.6554 22.5973 14.6554 21.291 16.0337L20.9241 16.4208L20.709 16.1938C19.4027 14.8156 17.286 14.8156 15.9797 16.1938C14.6734 17.572 14.6734 19.8052 15.9797 21.1834L19.7618 25.1747C20.1661 25.6013 20.3682 25.8146 20.6038 25.894C20.8109 25.9638 21.0351 25.9638 21.2422 25.8941C21.4778 25.8147 21.6799 25.6015 22.0843 25.1749L26.0203 21.0233Z" fill="url(#paint0_linear_6_99)" /> <path d="M21.4727 16.2061C22.6804 14.9319 24.6312 14.9319 25.8389 16.2061C27.0535 17.4879 27.0537 19.5699 25.8389 20.8516L21.9033 25.0029C21.6982 25.2193 21.5545 25.3705 21.4336 25.4785C21.3148 25.5846 21.2343 25.6329 21.1621 25.6572C21.0069 25.7094 20.8388 25.7095 20.6836 25.6572C20.6114 25.6329 20.531 25.5847 20.4121 25.4785C20.2912 25.3705 20.1483 25.2192 19.9434 25.0029L16.1611 21.0117C14.9463 19.73 14.9465 17.648 16.1611 16.3662C17.3688 15.092 19.3196 15.092 20.5273 16.3662L20.7422 16.5928L20.9238 16.7842L21.1055 16.5928L21.4727 16.2061Z" stroke="url(#paint1_linear_6_99)" strokeOpacity="0.8" strokeWidth="0.5" /> </g> <defs> <filter id="filter0_dd_6_99" x="0" y="0" width="47" height="45.9463" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="5" dy="5" /> <feGaussianBlur stdDeviation="7.5" /> <feColorMatrix type="matrix" values="0 0 0 0 0.791667 0 0 0 0 0.0785069 0 0 0 0 0.0329861 0 0 0 0.4 0" /> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6_99" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="-5" dy="-5" /> <feGaussianBlur stdDeviation="5" /> <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" /> <feBlend mode="normal" in2="effect1_dropShadow_6_99" result="effect2_dropShadow_6_99" /> <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_6_99" result="shape" /> </filter> <linearGradient id="paint0_linear_6_99" x1="12.2446" y1="13.3936" x2="26.9019" y2="26.278" gradientUnits="userSpaceOnUse"> <stop stopColor="white" /> <stop offset="1" stopOpacity="0" /> </linearGradient> <linearGradient id="paint1_linear_6_99" x1="15.2249" y1="15.2073" x2="24.4322" y2="25.8227" gradientUnits="userSpaceOnUse"> <stop stopColor="white" /> <stop offset="1" stopColor="white" stopOpacity="0" /> </linearGradient> </defs> </svg>
                            </div>
                        </div>

                        <div className="location-row">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                                <path d="M9.55742 1.62357C8.60722 0.673315 7.34384 0.150002 6.00005 0.150002C4.65626 0.150002 3.39288 0.673315 2.4426 1.62354C1.4924 2.57375 0.969086 3.8371 0.969086 5.18089C0.969086 6.52466 1.4924 7.78804 2.4426 8.73829L5.75147 12.047C5.82012 12.1157 5.9101 12.15 6.00005 12.15C6.09003 12.15 6.18 12.1157 6.24865 12.047L9.55733 8.73829C10.5075 7.78806 11.0308 6.52469 11.0309 5.18087C11.0309 3.83708 10.5076 2.57373 9.55742 1.62357ZM9.06015 8.24111L6.00003 11.3013L2.93978 8.24111C1.2524 6.55368 1.2524 3.80809 2.93976 2.12075C3.75724 1.30332 4.84409 0.853128 6.00005 0.853128C7.15601 0.853128 8.24279 1.30332 9.06022 2.12075C10.7476 3.80809 10.7476 6.55368 9.06015 8.24111Z" fill="#5533EA" stroke="#5533EA" strokeWidth="0.3" />
                                <path d="M7.58003 3.60095C7.15799 3.17893 6.59689 2.94653 6.00006 2.94653C5.40324 2.94653 4.84213 3.17893 4.42013 3.60095C3.99809 4.02297 3.76569 4.58408 3.76569 5.18092C3.76569 5.77774 3.99812 6.33886 4.42013 6.76087C4.84213 7.18289 5.40322 7.4153 6.00006 7.4153C6.59689 7.4153 7.15801 7.18289 7.58003 6.76085C8.00204 6.33883 8.23448 5.77774 8.23448 5.1809C8.23448 4.58406 8.00207 4.02297 7.58003 3.60095ZM7.08282 6.26364C6.79361 6.55286 6.40907 6.71215 6.00003 6.71215C5.59103 6.71215 5.20651 6.55286 4.91729 6.26367C4.62807 5.97445 4.46879 5.58993 4.46879 5.18092C4.46879 4.77191 4.62807 4.38737 4.91729 4.09813C5.20649 3.80893 5.59103 3.64965 6.00003 3.64965C6.40907 3.64965 6.79358 3.80893 7.0828 4.09813C7.37202 4.38733 7.5313 4.77187 7.5313 5.18088C7.53133 5.58991 7.37207 5.97442 7.08282 6.26364Z" fill="#5533EA" stroke="#5533EA" strokeWidth="0.3" />
                            </svg>
                            <span className="location">{dog.location}</span>
                        </div>

                        <p className="description">{dog.short_description}</p>
                    </div>
                </div>
            ))}
        </article>

    );
}
