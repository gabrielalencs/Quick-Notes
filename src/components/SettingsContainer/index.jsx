// React Icons

import { BsGearWideConnected } from "react-icons/bs";


const SettingsContainer = () => {
    return (
        <div>
            <div className="flex justify-end">
                <div className="h-11 w-11 grid place-items-center rounded-full duration-300 hover:bg-[#2dd4bf0a]">
                    <BsGearWideConnected className="text-white text-2xl cursor-pointer duration-300 hover:rotate-12" />
                </div>
            </div>
        </div>
    )
}

export default SettingsContainer