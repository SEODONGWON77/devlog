"use client";
import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

interface DropDownProps {
  dropDownList: { key: string; name: string }[];
}

const DropDown = ({ dropDownList }: DropDownProps) => {
  const [selected, setSelected] = useState<{
    key: string;
    name: string;
  }>(() => dropDownList[0]);

  console.log("selected", selected);

  return (
    <div className="flex mr-[2px] h-full justify-center items-center">
      <div className=" flex z-30 w-auto ml-2 ">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative">
            <Listbox.Button className="relative w-32 cursor-pointer rounded bg-white py-[6px] pl-3 pr-10 text-left border border-solid border-lightGray-30 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-lightGray-10 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 ml-auto mr-2 text-lightGray-40 transition-transform`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-62 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {dropDownList.map((item, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-pointer text-lightGray-30 select-none py-2 pl-4 m-[6px] ${
                        active
                          ? "bg-lightGray-10 text-black"
                          : "text-darkGray-10"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.name}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default DropDown;
