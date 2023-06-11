import React from "react";
import Detail from "./components/Detail";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="w-full">
        <div className="w-full flex">
          <div className="w-[10%]">
            <div>
              좋아요
            </div>
          </div>
          <div className="w-[80%]"> 
            <div className="w-full">
              <div className="py-2">
                <h1 className="text-5xl font-bold">[Next] NextJS 페이지간 query 데이터 이동방법 (Link, next/router)</h1>
              </div>
              <div className="py-2">
                <p className="font-bold">anonymous</p>
                <p className="">2023년 03월 26일</p>
              </div>
            </div>
            <div className="inline-flex py-2">
              <div>
                <div className="pointer-events-auto relative inline-flex rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900">
                  <div className="flex px-3 py-2">
                    <svg className="mr-2.5 h-5 w-5 flex-none fill-slate-400">
                      <path d="M5 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14l-5-2.5L5 18V4Z"></path>
                    </svg>Bookmark
                  </div>
                  <div className="border-l border-slate-400/20 px-2.5 py-2">12k</div>
                </div>
              </div>
              <div>
                <button type="button" className="adn ajm aql bac bbi bin bot bou bow bpf">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="nu rw">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="py-2">
              <div className={buttonWrap}>
                <div className={buttonStyle}>#카테고리1</div>
                <div className={buttonStyle}>#카테고리2</div>
                <div className={buttonStyle}>#카테고리3</div>
              </div>
            </div>
            {/* <div className="flex-auto flex space-x-4 w-full px-6 pt-2 pb-2">
              <button className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white" type="submit">
                Buy now
              </button>
              <button className="h-10 px-6 font-semibold rounded-full border border-slate-200 text-slate-900" type="button">
                Add to bag
              </button>
            </div> */}

            <div className="w-full h-80 bg-slate-400">
              <div className="bg-white border-slate-100 border-b rounded-t-xl">


              </div>
            </div>
            <div className="w-full">
              <Detail />
              {children}
            </div>
          </div>
          <div className="w-[10%] flex flex-col ">
            <div className="hidden px-4 lg:block lg:w-1/5">
                <menu className="sticky top-20">
                  <div className="relative mb-4 hidden h-[250px] delay-[0] duration-500 xl:block" id="dpl-gtm-scroll">
                    <div className="absolute h-full w-[180px]">
                      <div className="shadow-3 overflow-hidden rounded-lg border border-[rgba(133,214,251,0.3)]">
                        <span className="mx-2 mb-2 mt-3 inline-block h-[20px] w-[40%] animate-[pulse_1s_ease-in-out_infinite] bg-[rgba(133,214,251,0.3)]"></span>
                        <span className="mx-2 mb-1 inline-block h-[20px] w-[70%] animate-[pulse_1s_ease-in-out_infinite] bg-[rgba(133,214,251,0.3)]"></span>
                        <span className="mx-2 mb-1 inline-block h-[20px] w-[50%] animate-[pulse_1s_ease-in-out_infinite] bg-[rgba(133,214,251,0.3)]"></span>
                        <span className="mx-2 mb-1 inline-block h-[20px] w-[80%] animate-[pulse_1s_ease-in-out_infinite] bg-[rgba(133,214,251,0.3)]"></span>
                        <span className="mx-2 mb-2 inline-block h-[20px] w-[70%] animate-[pulse_1s_ease-in-out_infinite] bg-[rgba(133,214,251,0.3)]"></span>
                        <span className="mx-2 mb-2 inline-block h-[20px] w-[50%] animate-[pulse_1s_ease-in-out_infinite] bg-[rgba(133,214,251,0.3)]"></span>
                        <span className="mx-2 mb-2 inline-block h-[20px] w-[80%] animate-[pulse_1s_ease-in-out_infinite] bg-[rgba(133,214,251,0.3)]"></span>
                      </div>
                    </div>
                    <div id="gtmDC-scroll-all" className="relative min-h-[1px] w-[180px]" data-gtm-vis-recent-on-screen-58642524_6="731" data-gtm-vis-first-on-screen-58642524_6="731" data-gtm-vis-total-visible-time-58642524_6="100" data-gtm-vis-has-fired-58642524_6="1" data-gtm-vis-recent-on-screen-58642524_15="735" data-gtm-vis-first-on-screen-58642524_15="735" data-gtm-vis-total-visible-time-58642524_15="100" data-gtm-vis-has-fired-58642524_15="1" data-gtm-vis-recent-on-screen-58642524_17="738" data-gtm-vis-first-on-screen-58642524_17="738" data-gtm-vis-total-visible-time-58642524_17="100" data-gtm-vis-has-fired-58642524_17="1" data-gtm-vis-recent-on-screen-58642524_18="741" data-gtm-vis-first-on-screen-58642524_18="741" data-gtm-vis-total-visible-time-58642524_18="100" data-gtm-vis-has-fired-58642524_18="1" data-gtm-vis-recent-on-screen-58642524_25="744" data-gtm-vis-first-on-screen-58642524_25="744" data-gtm-vis-total-visible-time-58642524_25="100" data-gtm-vis-has-fired-58642524_25="1" data-gtm-vis-recent-on-screen-58642524_31="746" data-gtm-vis-first-on-screen-58642524_31="746" data-gtm-vis-total-visible-time-58642524_31="100" data-gtm-vis-has-fired-58642524_31="1" data-gtm-vis-recent-on-screen-58642524_32="749" data-gtm-vis-first-on-screen-58642524_32="749" data-gtm-vis-total-visible-time-58642524_32="100" data-gtm-vis-has-fired-58642524_32="1" data-gtm-vis-recent-on-screen-58642524_36="751" data-gtm-vis-first-on-screen-58642524_36="751" data-gtm-vis-total-visible-time-58642524_36="100" data-gtm-vis-has-fired-58642524_36="1" data-gtm-vis-recent-on-screen-58642524_41="753" data-gtm-vis-first-on-screen-58642524_41="753" data-gtm-vis-total-visible-time-58642524_41="100" data-gtm-vis-has-fired-58642524_41="1"><a id="material-minimal-promo" href="https://material-minimal.com/" target="_blank"><div className="border-2 border-dark dark:border-primary-10 bg-white flex justify-center mb-5 hidden rounded-lg border-2  p-4 transition-all dark:bg-neutral-800 xl:block h-[250px]"><div className="py-5 grid"><p className="mb-2">Learn about <strong>Material Minimal</strong> design system &amp; claim <strong>early access</strong> to Figma Design Kit.</p><span role="button" className="text-center bg-secondary-100 leading-normal text-secondary-700 hover:bg-primary-accent-100 focus:bg-primary-accent-100 active:bg-primary-accent-200 dark:bg-black dark:text-neutral-100 mt-3 rounded px-4 pt-[6px] pb-[5px] text-xs text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0">CLAIM NOW</span></div></div></a></div>
                  </div>
                  <ul className="dark:text-neutral-200">
                    <li className="mb-1 pl-[9px] text-[0.85rem] data-[te-spy-active]:border-l-2 data-[te-spy-active]:border-solid data-[te-spy-active]:border-l-primary data-[te-spy-active]:text-primary dark:data-[te-spy-active]:border-l-primary-400 dark:data-[te-spy-active]:text-primary-400" data-te-spy-active="">
                      <a href="#basic-example">Basic example</a>
                    </li>
                    <li className="mb-1 pl-[9px] text-[0.85rem] data-[te-spy-active]:border-l-2 data-[te-spy-active]:border-solid data-[te-spy-active]:border-l-primary data-[te-spy-active]:text-primary dark:data-[te-spy-active]:border-l-primary-400 dark:data-[te-spy-active]:text-primary-400">
                      <a href="#section-related-resources">Related resources</a>
                    </li>
                  </ul>
                </menu>
              </div>
          </div>
        </div>
      </div>
  );
}

export default MainLayout;

const {
  buttonWrap,
  buttonStyle
} = {
  buttonWrap: 'inline-flex justify-between', 
  buttonStyle: 'px-3 py-1 text-sm font-semibold text-gray-700'
};
