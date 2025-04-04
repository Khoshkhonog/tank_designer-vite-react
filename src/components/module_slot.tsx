import { ModulesCategory } from "../types";
interface ModuleSlotProps {
    imgSrc?: string;
    category?: keyof ModulesCategory
}
import { useAppContext } from "./context/context";

const ModuleSlot: React.FC<ModuleSlotProps> = ({ imgSrc, category = 'armore' }) => {
    const { handleShowChoiceCompanent } = useAppContext()
    return <div>
        <button
            className='eq_module transparent-btn'
            title="add module"
            onClick={() => { handleShowChoiceCompanent(category) }}>
            <img className={typeof imgSrc === 'string' && imgSrc ? '' : "kostylN1"} src={typeof imgSrc === 'string' && imgSrc && imgSrc !== 'default' ? imgSrc : "/imgs/module_slot_icon_empty.png"} alt="" />
        </button>
    </div>
}
export default ModuleSlot