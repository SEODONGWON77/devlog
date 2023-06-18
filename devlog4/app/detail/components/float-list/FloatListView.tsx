import React from "react";

interface FloatListViewProps {

}

const FloatListView = React.forwardRef<
  HTMLInputElement,
  FloatListViewProps
>(() => {
  return (
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
  );
});
FloatListView.displayName = "FloatListView";
export default FloatListView;
