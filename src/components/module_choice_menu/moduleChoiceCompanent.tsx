import { useAppContext } from "../context/context"
import { moduleType, ModulesCategory } from "../../types"
import { memo, useEffect, useState } from "react"
const ModuleChoiceCompanent = () => {
    const { changingCategory, defaultTank, updateDefaultStats, setDefaultTank, showChoiceCompanent, setShowChoiceCompanent, choiceCompanentContent, } = useAppContext()
    const deleteModule: moduleType = {
        'id': 1337,
        "abbreviation": "remove",
        "category": "tank_special_module",
        "sfx": "sfx_ui_sd_module_engine",
        "picture": "stop_icon.png",
        "name": "Remove"
    }
    //changing slot in tank project 
    const uniqueCheck = (param: moduleType) => {
        //only special slots because they can be repeated
        const checkingvalue = [
            defaultTank.special_slot_1,
            defaultTank.special_slot_2,
            defaultTank.special_slot_3,
            defaultTank.special_slot_4
        ];

        if (param.is_singleton !== false) {
            const isUnique = !checkingvalue.some(module => module?.id === param.id);
            return isUnique;
        } else {
            return true;
        }
    }
    //useState for filtering
    const [updatedChoiceCompanentContent, setUpdatedChoiceCompanentContent] = useState<moduleType[]>([]);
    useEffect(() => {
        setUpdatedChoiceCompanentContent(Array.from(choiceCompanentContent))
    }, [choiceCompanentContent, defaultTank.chassis.type])

    type ModuleKeys = keyof ModulesCategory;

    const handleChangeTank = (moduleParam: moduleType, del: boolean = false) => {
        const playSound = () => {
            const audio = new Audio(`/sfx/${moduleParam?.sfx}_01.wav`); // Укажите путь к вашему файлу
            audio.volume = 0.2
            audio.play();
        };
        const paramCopy = { ...moduleParam }

        setDefaultTank(prevTank => {
            const updatedTank = { ...prevTank };
            // updatedTank[changingCategory] = moduleParam doesn't work idk why
            const updateActions: { [key in ModuleKeys]: (param: moduleType) => void } = {
                main_armament: (param) => { updatedTank.main_armament = param; },
                turret: (param) => { updatedTank.turret = param; },
                engine: (param) => { updatedTank.engine = param; },
                armore: (param) => { updatedTank.armore = param; },
                suspension: (param) => { updatedTank.suspension = param; },
                special_slot_1: (param) => updateSpecialSlot('special_slot_1', param),
                special_slot_2: (param) => updateSpecialSlot('special_slot_2', param),
                special_slot_3: (param) => updateSpecialSlot('special_slot_3', param),
                special_slot_4: (param) => updateSpecialSlot('special_slot_4', param),
            };

            const updateSpecialSlot = (slot: ModuleKeys, param: moduleType) => {
                if (!slot || !param) {
                    console.error("Invalid slot or module parameter");
                    return;
                }

                if (uniqueCheck(param)) {
                    updatedTank[slot] = param;
                } else {
                    alert(`Project can't have ${param.name} more than 1`);
                }
            };

            if (del) {
                if (changingCategory == 'special_slot_1' || changingCategory === 'special_slot_2' || changingCategory == 'special_slot_3' || changingCategory == 'special_slot_4') {
                    if (updatedTank.defalt_stats?.xp_cost && updatedTank[changingCategory]?.xp_cost) {
                        updatedTank.defalt_stats.xp_cost -= updatedTank[changingCategory]?.xp_cost
                    }
                    setShowSpecialSlotGrid(false)
                    updatedTank[changingCategory] = undefined
                }
            } else {
                if (updateActions[changingCategory]) {
                    updateActions[changingCategory](paramCopy);
                    setShowSpecialSlotGrid(false)
                }
            }
            return updatedTank;
        });
        playSound()
        setShowChoiceCompanent(false);
        updateDefaultStats()
    };
    const handleBackBtn = () => {
        setShowChoiceCompanent(false)
        setShowSpecialSlotGrid(false)
    }
    const [showSpecialSlotGrid, setShowSpecialSlotGrid] = useState<boolean>(false)

    const updateSpecialSlotCategory = (param: string) => {
        setUpdatedChoiceCompanentContent((prev) => { return prev.filter((item) => item.category === param) }
        )
        setShowSpecialSlotGrid(true)
    }
    interface ModuleChoiceButtonProps {
        name: string;
        img: string;
        category: string
    }
    interface ModuleButtonProps {
        item: moduleType;
        onClick: (item: moduleType) => void;
    }
    const renderMain = () => {
        switch (changingCategory) {
            case 'main_armament':
                return renderMainAmarment()
            case 'special_slot_1':
            case 'special_slot_2':
            case 'special_slot_3':
            case 'special_slot_4':
                return renderSpecialSlots()
            case 'turret':
                return renderTurrets()
            default:
                return <ModuleGrid items={updatedChoiceCompanentContent} onItemClick={handleChangeTank} Show={true} />

        }
    }
    const ModuleChoiceButton: React.FC<ModuleChoiceButtonProps> = ({ name, img, category }) => (
        <div>

            <button className="transparent-btn" onClick={() => updateSpecialSlotCategory(category)}>
                <div className="flex gap-10">
                    <img src={`/imgs/modules/${img}`} alt="" />
                    <div>{name}</div>
                </div>
            </button>
        </div>

    )
    const ModuleButton: React.FC<ModuleButtonProps> = ({ item, onClick }) => (
        <button onClick={() => onClick(item)} className="transparent-btn" title={item.name}>
            <div className="flex gap-10">
                <img src={`/imgs/modules/${item.picture}`} alt="" />
                <div className="module-data-container">
                    <div className="module-name">{item.name}</div>
                    <div className="item-price flex">
                        <img src="/imgs/Army_experience.png" alt="" />
                        <div>{item.xp_cost}</div>
                    </div>
                </div>
            </div>
        </button>
    );
    const ModuleGrid: React.FC<{ items: moduleType[], onItemClick: (item: moduleType) => void, Show: boolean }> = memo(({ items, onItemClick, Show }) => (
        <div className={` ${Show ? 'modules-choice-grid' : 'none'}`}>
            <button className={`transparent-btn ${defaultTank[changingCategory] ? 'block' : 'none'}`} onClick={() => handleChangeTank(deleteModule, true)}>
                <div className="flex gap-10">
                    <img className="delete-icon" src={`/imgs/modules/${deleteModule.picture}`} alt="" />
                    <div>{deleteModule.name}</div>
                </div>
            </button>
            {items.map((item) => <ModuleButton key={item.id} item={item} onClick={onItemClick} />)}
        </div>
    ));

    const renderSpecialSlots = () => {
        return <div>
            <div className={`${showSpecialSlotGrid ? 'none' : 'sml-modules-choice-grid'}`}>
                <button className={`transparent-btn ${defaultTank[changingCategory] ? 'block' : 'none'}`} onClick={() => handleChangeTank(deleteModule, true)}>
                    <div className="flex gap-10">
                        <img className="delete-icon" src={`/imgs/modules/${deleteModule.picture}`} alt="" />
                        <div>{deleteModule.name}</div>
                    </div>
                </button>
                <ModuleChoiceButton name="Tank Special Module" img="EMI_tank_special_module.png" category="tank_special_module" />
                <ModuleChoiceButton name="Secondary Turret" img="tank_module_secondary_turret_hmg.png" category="tank_secondary_turret" />
                <ModuleChoiceButton name="Radio" img="EMI_tank_radio_module.png" category="tank_radio_module" />
            </div>
            <ModuleGrid items={updatedChoiceCompanentContent} onItemClick={handleChangeTank} Show={showSpecialSlotGrid} />
        </div>
    }
    const renderMainAmarment = () => {
        return <>
            <div className={`${showSpecialSlotGrid ? 'none' : 'sml-modules-choice-grid'}`}>
                <ModuleChoiceButton name="Small Armament" img="EMI_tank_small_main_armament.png" category="tank_small_main_armament" />
                <ModuleChoiceButton name="Tank Medium Armament" img="EMI_tank_medium_main_armament.png" category="tank_medium_main_armament" />
                <ModuleChoiceButton name="Tank Heavy Armament" img="EMI_tank_heavy_main_armament.png" category="tank_heavy_main_armament" />
            </div>
            <ModuleGrid items={updatedChoiceCompanentContent} onItemClick={handleChangeTank} Show={showSpecialSlotGrid} />
        </>
    }
    const renderTurrets = () => {
        return <div>
            <div className={`${showSpecialSlotGrid ? 'none' : 'sml-modules-choice-grid'}`}>
                <ModuleChoiceButton name="Tank Light Turret" img="EMI_tank_light_turret_type.png" category="tank_light_turret_type" />
                <ModuleChoiceButton name="Tank Medium Turret" img="EMI_tank_medium_turret_type.png" category="tank_medium_turret_type" />
                <ModuleChoiceButton name="Tank Heavy Turret" img="EMI_tank_heavy_turret_type.png" category="tank_heavy_turret_type" />
                <ModuleChoiceButton name="Tank Super Heavy Turret" img="EMI_tank_super_heavy_turret_type.png" category="tank_super_heavy_turret_type" />
            </div>
            <ModuleGrid items={updatedChoiceCompanentContent} onItemClick={handleChangeTank} Show={showSpecialSlotGrid} />
        </div>
    }
    return <div className={showChoiceCompanent ? 'block module-choice' : 'none module-choice'}>
        <button onClick={() => { handleBackBtn() }} >back</button>
        <div>
            {renderMain()}
        </div>
    </div>
}
export default ModuleChoiceCompanent

