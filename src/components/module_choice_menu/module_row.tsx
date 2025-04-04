import ModuleSlot from "../module_slot"
import { useAppContext } from "../context/context"
interface ModuleRowProps {
    nRows: 3 | 6;
}
const ModuleRow: React.FC<ModuleRowProps> = ({ nRows }) => {
    const path = '/imgs/modules/'
    const { defaultTank, } = useAppContext()
    switch (nRows) {
        case 3: return (
            <>
                <ModuleSlot imgSrc={path + defaultTank.suspension.picture} category={'suspension'} />
                <ModuleSlot imgSrc={path + defaultTank.armore.picture} category={'armore'} />
                <ModuleSlot imgSrc={path + defaultTank.engine.picture} category={'engine'} />
            </>
        )
        case 6:
            return (
                <>
                    <ModuleSlot imgSrc={path + defaultTank.turret.picture} category={'turret'} />
                    <ModuleSlot imgSrc={defaultTank.main_armament ? path + defaultTank.main_armament.picture : 'default'} category={'main_armament'} />
                    <ModuleSlot imgSrc={defaultTank.special_slot_1 ? path + defaultTank.special_slot_1?.picture : 'default'} category={'special_slot_1'} />
                    <ModuleSlot imgSrc={defaultTank.special_slot_2 ? path + defaultTank.special_slot_2?.picture : 'default'} category={'special_slot_2'} />
                    <ModuleSlot imgSrc={defaultTank.special_slot_3 ? path + defaultTank.special_slot_3?.picture : 'default'} category={'special_slot_3'} />
                    <ModuleSlot imgSrc={defaultTank.special_slot_4 ? path + defaultTank.special_slot_4?.picture : 'default'} category={'special_slot_4'} />
                </>
            )
    }
}
export default ModuleRow