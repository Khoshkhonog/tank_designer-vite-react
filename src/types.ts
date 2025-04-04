export type moduleType = {
    abbreviation?: string,
    sfx?: string,
    add_stats?: StatsType
    multiply_stats?: StatsType
    dismantle_cost_ic?: number
    name: string
    picture?: string
    category: string
    xp_cost?: number
    is_singleton?: boolean
    type?:string
    id:number
    forbid_equipment_type?:string,
}
export type ModulesCategory = {
    engine: string;
    armore: string;
    suspension: string;
    turret: string[];
    main_armament: string[];
    special_slot_1?: string[]
    special_slot_2?: string[]
    special_slot_3?: string[]
    special_slot_4?: string[]
};
export type StateContextType = {
    modulesData: moduleType[]
    setModulesData: React.Dispatch<React.SetStateAction<moduleType[]>>
}
export type TankRole = 'light' | 'medium' | 'heavy' | 'aa' | 'td' | 'art' | 'flame';
export type TankType = {
    tank_type?: moduleType
    main_armament?: moduleType
    turret: moduleType
    engine: moduleType
    armore: moduleType
    suspension: moduleType
    chassis:moduleType
    defalt_stats?:StatsTypeReq
    special_slot_1?:moduleType
    special_slot_2?:moduleType
    special_slot_3?:moduleType
    special_slot_4?:moduleType
    tank_role:TankRole,
    armor_level:number
    engine_level:number
}
export type StatsType = {
    hard_attack?: number
    soft_attack?: number
    defense?:number
    build_cost_ic?:number
    ap_attack?:number
    piercing?:number
    maximum_speed?:number
    breakthrough?:number
    reliability?:number
    supply_use?:number
    fuel_consumption?:number
    armor?:number
    hardness?: number
    air_attack?:number
    fuel_capacity?: number
    fuel_usage?: number
    suppresion?:number
    reconnaissance?:number
    entrenchment?:number

}
export type StatsTypeReq = {
    hard_attack: number
    soft_attack: number
    defense:number
    build_cost_ic:number
    ap_attack:number
    maximum_speed:number
    breakthrough:number
    reliability:number
    supply_use:number
    piercing:number
    fuel_consumption:number
    armor:number
    hardness: number
    air_attack:number
    fuel_capacity: number,
    fuel_usage: number,
    suppresion:number,
    reconnaissance:number,
    entrenchment:number,
    xp_cost:number

}
export type TankGenericImgsType = {
    light:string[]
    medium:string[]
    heavy:string[]
}
export type SoundNameType = 'click' | 'engine' | 'misc' | 'sonar' | 'turret';
export interface GetFromLineOptions {
    encoded?: boolean;
    resetXp?: boolean;
}