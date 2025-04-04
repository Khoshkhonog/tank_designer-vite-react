import { useState } from "react";
import { TankType } from "../../types";
import Cookies from "js-cookie";
import { useAppContext } from "../context/context";
import SaveLoadCompanent from "../save_load/save_load_companent";
const ChassisChoice = () => {
    const { setShowTankDesigner, setTankNameState, setDefaultTank, updateDefaultStats, saveToLine, savedTemplates, tankTemplates, setTankTemplates, setSavedTemplates, playSound } = useAppContext()
    const handleShowMain = (chassisParam: TankType) => {
        setTankNameState(chassisParam['chassis'].name)
        setShowTankDesigner(true)
        setDefaultTank(Object.assign({}, chassisParam))
        updateDefaultStats()
        playSound('turret')
    }
    const handleDeleteTemplate = (item: TankType) => {
        setShowTankDesigner(false)
        setTankTemplates((prev) => {
            const updatedTemplates = prev.filter((itemFilter) => itemFilter !== item)
            return updatedTemplates
        })
        setSavedTemplates((prev) => {
            const updatedCookiesTemplates = prev.filter((itemFilter) => itemFilter != saveToLine(item, false))
            Cookies.set('savedTemplates', JSON.stringify(updatedCookiesTemplates), { expires: 7 });
            console.log(updatedCookiesTemplates)
            return updatedCookiesTemplates
        })
    }
    const [isVisible, setIsVisible] = useState(true);

    const toggle = () => {
        setIsVisible(!isVisible);
    };

    return <div className="flex chassis-choice-container">
        <div className="left-div">
            <button onClick={() => toggle()} title="Show/Hide" className="transparent-btn arrow-button">
                <img src={isVisible ? '/imgs/buttons/button_navigation_left.png' : '/imgs/buttons/button_navigation_right.png'} alt="" />
            </button>
        </div>
        <div className={`chassis-choice ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <div className="chassis-idk">
                <SaveLoadCompanent show="load" />
                {tankTemplates.map((item, acc) => <div className="chassis-container flex align-center" key={acc}>
                    <div>
                        <div className="chassis-name">{item.chassis?.name}</div>
                        <img className="chassis-img" src={"/imgs/chassis/" + item.chassis?.picture} alt="" />
                    </div>
                    <div className="chassie-choice-btns flex">
                        <button className={`delete-btn transparent-btn ${savedTemplates.includes(saveToLine(item, false)) ? 'block' : 'none'}`} title="delete" onClick={() => handleDeleteTemplate(item)}>
                            <img src="/imgs/buttons/techtree_dotline_horisontal.png" alt="" />
                        </button>
                        <button title="change" className="edit-btn transparent-btn" onClick={() => handleShowMain(item)}>
                            <img src='/imgs/buttons/create_button.png' alt="" />
                        </button>
                    </div>
                </div>)}
            </div>
        </div>
    </div>
}
export default ChassisChoice