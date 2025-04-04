import DesignerButton from "./designer_button"
import ModuleChoiceCompanent from "./module_choice_menu/moduleChoiceCompanent"
import { useAppContext } from "./context/context"
import ModuleRow from "./module_choice_menu/module_row"
import StatsGridCompanent from "./stats_grid/stats_grid_companent"
import SaveLoadCompanent from "./save_load/save_load_companent"
import PopOutCompanent from "./popout/popout"
import { useEffect, useState } from "react"
import { moduleType, StatsType, TankRole } from "../types"
const DesignerMainWindow = () => {

    const [blueprintTankImg, setBlueprintTankImg] = useState<string>()
    const { defaultTank, setDefaultTank, updateEngineArmorLevel, tankNameState, playSound, handleChangeTemplates, setTankNameState, showTankDesigner, setShowTankDesigner, updateDefaultStats } = useAppContext()
    const HandleChangeTankName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTankNameState(event.target.value)
    }
    useEffect(() => {
        setSelectedRole(defaultTank.tank_role)

    }, [defaultTank.tank_role])
    const [selectedRole, setSelectedRole] = useState<TankRole>(defaultTank.tank_role);
    const onChangeRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDefaultTank(prevTank => { return { ...prevTank, tank_role: event.target.value as TankRole } }
        )
        playSound('misc')
    }
    //useEffect for updating tank role and stats
    useEffect(() => {
        //placeholder
        var newTypeModule: moduleType = {
            id: 999,
            name: 'placeholder',
            category: 'placeholder',
            type: 'placeholder'
        }
        type statType = {
            add_stats: StatsType
            multiply_stats: StatsType
        }
        type statsConfig = {
            light: statType,
            medium: statType
            heavy: statType
        }
        //Anti Air tank
        const statsConfigAA: statsConfig = {
            light: {
                add_stats:
                {
                    supply_use: -0.12,

                },
                multiply_stats: {
                    breakthrough: -0.7

                }
            },
            medium: {
                add_stats:
                    { supply_use: -0.15 },
                multiply_stats: {
                    breakthrough: -0.68

                }
            },
            heavy: {
                add_stats:
                    { supply_use: -0.22 },
                multiply_stats: {
                    breakthrough: -0.5

                }
            }
        };
        //Artilery
        const statsConfigArt: statsConfig = {
            light: {
                add_stats:
                {
                    supply_use: 0.2,
                    piercing: 0.3
                },
                multiply_stats: {
                    soft_attack: 0.35,
                    breakthrough: -0.57

                }
            },
            medium: {
                add_stats:
                    { supply_use: -0.28 },
                multiply_stats: {
                    soft_attack: 0.35,
                    breakthrough: -0.4

                }
            },
            heavy: {
                add_stats:
                    { supply_use: -0.22 },
                multiply_stats: {
                    soft_attack: 0.35,
                    breakthrough: -0.40

                }
            }
        };
        //Flame tank
        const statsConfigFlame: statsConfig = {
            light: {
                add_stats:
                {
                    supply_use: -0.2,
                },
                multiply_stats: {
                    soft_attack: -0.75,
                    breakthrough: -0.90,
                    armor: -0.75,
                    defense: -0.75

                }
            },
            medium: {
                add_stats:
                {
                    supply_use: -0.22
                },
                multiply_stats: {
                    soft_attack: -0.70,
                    breakthrough: -0.85,
                    armor: -0.7,
                    defense: -0.7

                }
            },
            heavy: {
                add_stats:
                {
                    supply_use: -0.29
                },
                multiply_stats: {
                    soft_attack: -0.625,
                    armor: -0.625,
                    breakthrough: -0.775,
                    defense: -0.625

                }
            }

        }
        //Tank destroyer
        const statsConfigTd: statsConfig = {
            light: {
                add_stats:
                {
                    supply_use: -0.02,
                },
                multiply_stats: {
                    hard_attack: 0.3,
                    piercing: 0.3,
                    breakthrough: -0.57,
                    suppresion: -1.5
                }
            },
            medium: {
                add_stats:
                {
                    supply_use: -0.02
                },
                multiply_stats: {
                    hard_attack: 0.3,
                    piercing: 0.3,
                    breakthrough: -0.40,
                    suppresion: -1.25

                }
            },
            heavy: {
                add_stats:
                {
                    supply_use: -0.02
                },
                multiply_stats: {
                    hard_attack: 0.3,
                    piercing: 0.3,
                    breakthrough: -0.40,
                    suppresion: -1.25

                }
            }

        }

        const chassisType: keyof statsConfig = defaultTank?.chassis.type as keyof statsConfig;
        switch (selectedRole) {
            case 'aa':
                newTypeModule['add_stats'] = statsConfigAA[chassisType]?.add_stats;
                newTypeModule['multiply_stats'] = statsConfigAA[chassisType]?.multiply_stats;
                break;
            case 'art':
                newTypeModule['add_stats'] = statsConfigArt[chassisType]?.add_stats;
                newTypeModule['multiply_stats'] = statsConfigArt[chassisType]?.multiply_stats;
                break;
            case 'flame':
                newTypeModule['add_stats'] = statsConfigFlame[chassisType]?.add_stats;
                newTypeModule['multiply_stats'] = statsConfigFlame[chassisType]?.multiply_stats;
                break
            case 'td':
                newTypeModule['add_stats'] = statsConfigTd[chassisType]?.add_stats;
                newTypeModule['multiply_stats'] = statsConfigTd[chassisType]?.multiply_stats;
                break
        }
        setDefaultTank(prevTank => {
            prevTank['tank_type'] = newTypeModule
            return prevTank
        })
        updateDefaultStats()
    }, [selectedRole])
    const TankWeightClass = defaultTank?.chassis.type
    // useEffect for updating blueprintTankImg
    useEffect(() => {
        const imgConfig = {
            light: `/imgs/generic_tank_imgs/generic_light_tank_blueprint.png`,
            medium: `/imgs/generic_tank_imgs/generic_medium_tank_blueprint.png`,
            heavy: `/imgs/generic_tank_imgs/generic_heavy_tank_blueprint.png`,
            aa: `/imgs/generic_tank_imgs/generic_${TankWeightClass}_tank_anti_air_blueprint.png`,
            td: `/imgs/generic_tank_imgs/generic_${TankWeightClass}_tank_destroyer_blueprint.png`,
            art: `/imgs/generic_tank_imgs/generic_${TankWeightClass}_tank_artillery_blueprint.png`,
            flame: `/imgs/generic_tank_imgs/generic_${TankWeightClass}_tank_blueprint.png`
        }
        setBlueprintTankImg(imgConfig[selectedRole])
    }, [defaultTank.tank_type])

    return (
        <>
            <div className={`tank-designer ${showTankDesigner ? 'flex' : 'none'}`}>
                <div>
                    <PopOutCompanent />
                    <div className="flex tank-designer-header-btns">
                        <div className="position-absolute">
                            <button onClick={() => setShowTankDesigner(false)} className="close-btn transparent-btn" title="Close">
                                <img src="/imgs/buttons/main_close_button.png" alt="" />
                            </button>
                        </div>
                    </div>
                    <div className="tank-desinger-idk flex">
                        <div className="tank-designer-container">
                            <div className="desinger-top-part">
                                <div className="flex">
                                    <div className='top-title-role-img'>
                                        <div className='tank-name'>
                                            <img src="/imgs/tank_name_bg.png" alt="" />
                                            <input onChange={(event) => HandleChangeTankName(event)} value={tankNameState} type="text" placeholder="Tank" size={29} maxLength={29} className="transparent-btn input-tank-name" />
                                        </div>
                                        <div className='tank-name'>
                                            <img src="/imgs/tank_role_bg.png" alt="" />
                                            <div className="tank-role">
                                                <select className="role-selector"
                                                    name="roleSelector"
                                                    value={selectedRole}
                                                    id="role"
                                                    title="Role Choice"
                                                    onChange={(event) => onChangeRole(event)}>
                                                    <option value={`${defaultTank?.chassis.type}`} className="flex">
                                                        {`${defaultTank.chassis.type?.charAt(0).toUpperCase()}${defaultTank.chassis.type?.slice(1)} Tank`}
                                                    </option>
                                                    <option value="td" className="flex">Tank Destroyer</option>
                                                    <option value="art" className="flex">Artilery</option>
                                                    <option value="aa" className="flex">Anti-Air</option>
                                                    <option value="flame" className="flex">Flame</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tank-main-img-choice">
                                    </div>
                                </div>
                                <div className='top-modules-container'>
                                    <ModuleRow nRows={6} />
                                </div>
                            </div>
                            <div className="tank-desingner-bg">
                                <div className="blue-print-rew">
                                    <img src={blueprintTankImg} alt="generic tank blueprint" />
                                    <ModuleChoiceCompanent />
                                </div>
                            </div>
                            <div className="armor-engine-container flex">
                                <div className="bottom-modules">
                                    <ModuleRow nRows={3} />
                                </div>
                                <div className="add-substract flex gap-24">
                                    <div className="flex flex-column align-center">
                                        <div>Armore</div>
                                        <div className="flex gap-10 align-center">
                                            <button className="transparent-btn" title="substract" onClick={(event) => updateEngineArmorLevel(event, 'armor_level', 'subtract')}>
                                                <img src="/imgs/buttons/subtract_one.png" alt="" />
                                            </button>
                                            <div>{defaultTank?.armor_level}</div>
                                            <button className="transparent-btn" title="add-to" onClick={(event) => updateEngineArmorLevel(event, 'armor_level', 'add')}>
                                                <img src="/imgs/buttons/add_one.png" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-column align-center">
                                        <div>Engine</div>
                                        <div className="flex gap-10 align-center">
                                            <button className="transparent-btn" title="substract" onClick={(event) => updateEngineArmorLevel(event, 'engine_level', 'subtract')}>
                                                <img src="/imgs/buttons/subtract_one.png" alt="" />
                                            </button>
                                            <div>{defaultTank?.engine_level}</div>
                                            <button className="transparent-btn" title="add-to" onClick={(event) => updateEngineArmorLevel(event, 'engine_level', 'add')}>
                                                <img src="/imgs/buttons/add_one.png" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <StatsGridCompanent />
                    </div>
                    <div className="designer-footer flex">
                        <div className="footer-container">
                            <button className="yellow-btn transparent-btn">
                                <img src="/imgs/buttons/button_148x34_light.png" alt="" />
                                <div>Reset</div>
                            </button>
                            <div className="desinger-buttons-container flex">
                                <DesignerButton img='auto' />
                                <DesignerButton img='duplicate' />
                                <DesignerButton img='upgrade' />
                            </div>
                            <div className="count-army-exp flex">
                                <img src="/imgs/Army_experience.png" alt="" />
                                <div>500</div>
                            </div>
                            <button disabled={defaultTank.defalt_stats?.xp_cost && defaultTank.defalt_stats.xp_cost >= 1 ? false : true} onClick={() => handleChangeTemplates()}
                                className="save-btn transparent-btn flex gap-10">
                                <div>Save</div>
                                <div className="flex">
                                    <img src="/imgs/Army_experience.png" alt="" />
                                    {defaultTank.defalt_stats?.xp_cost}
                                </div>
                            </button>
                            <SaveLoadCompanent show="save" />
                            <div className="resources-count"></div>
                        </div>
                        <div className="production-cost flex gap-10 align-center">
                            <div>Production Cost:</div>
                            <div className="flex align-center">
                                <img src="/imgs/production_cost.png" alt="" />
                                {defaultTank.defalt_stats?.build_cost_ic}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DesignerMainWindow