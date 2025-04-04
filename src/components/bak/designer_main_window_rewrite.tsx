import DesignerButton from "../designer_button"
import ModuleChoiceCompanent from "../module_choice_menu/moduleChoiceCompanent"
import { useAppContext } from "../context/context"
import ModuleRow from "../module_choice_menu/module_row"
import StatsGridCompanent from "../stats_grid/stats_grid_companent"
import { useEffect, useState } from "react"
const DesignerMainWindowRew = () => {

    const { defaultTank, updateEngineArmorLevel, tankNameState, handleChangeTemplates, setTankNameState, showTankDesigner, setShowTankDesigner } = useAppContext()
    const [mainTankImg, setMainTankImg] = useState('light')
    const HandleChangeTankName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTankNameState(event.target.value)

    }
    useEffect(() => {
        switch (defaultTank.chassis.type) {
            case 'light':
                setMainTankImg('/imgs/generic_tank_imgs/generic_light_tank_blueprint.png')
                break
            case 'medium':
                setMainTankImg('/imgs/generic_tank_imgs/generic_medium_tank_blueprint.png')
                break
            case 'heavy':
                setMainTankImg('/imgs/generic_tank_imgs/generic_heavy_tank_blueprint.png')
                break
        }
    }, [defaultTank])

    return (
        <>
            <div className='tank-designer' style={showTankDesigner ? { 'display': 'flex' } : { "display": "none" }}>
                <div>
                    <div className="position-absolute">
                        <button onClick={() => setShowTankDesigner(false)} className="close-btn transparent-btn" title="Close">
                            <img src="/imgs/buttons/main_close_button.png" alt="" />
                        </button>
                    </div>
                    <div className="tank-desinger-idk flex">
                        <div className="tank-designer-container">
                            <div className="desinger-top-part">
                                <div className='top-title-role-img'>
                                    <div className='tank-name'>
                                        <img src="/imgs/tank_name_bg.png" alt="" />
                                        <input onChange={(event) => HandleChangeTankName(event)} value={tankNameState} type="text" placeholder="Tank" className="transparent-btn" />
                                    </div>
                                    <div className='tank-name'>
                                        <img src="/imgs/tank_role_bg.png" alt="" />
                                        <div>Role Placeholder</div>
                                    </div>
                                </div>
                                <div className='top-modules-container'>
                                    <ModuleRow nRows={6} />
                                </div>
                            </div>
                            <div className="tank-desingner-bg">
                                <div className="blue-print-rew">
                                    <img src={mainTankImg} alt="generic tank blueprint" />
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
                                            <div>{defaultTank.armor_level}</div>
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
                                            <div>{defaultTank.engine_level}</div>
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
                            <button disabled={defaultTank.defalt_stats?.xp_cost && defaultTank.defalt_stats?.xp_cost >= 1 ? false : true} onClick={() => handleChangeTemplates()}
                                className="save-btn transparent-btn flex gap-10">
                                <div>Save</div>
                                <div className="flex">
                                    <img src="/imgs/Army_experience.png" alt="" />
                                    {defaultTank.defalt_stats?.xp_cost}
                                </div>
                            </button>
                            <div className="resources-count"></div>
                        </div>
                        <div className="production-cost flex gap-10">
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
export default DesignerMainWindowRew