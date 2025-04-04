import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { moduleType, ModulesCategory, TankType, StatsType, StatsTypeReq, TankGenericImgsType, SoundNameType, TankRole, GetFromLineOptions } from "../../types";

type StateContextType = {
    modulesData: moduleType[]
    setModulesData: React.Dispatch<React.SetStateAction<moduleType[]>>
    defaultTank: TankType
    setDefaultTank: React.Dispatch<React.SetStateAction<TankType>>
    getModulesByCategory: (category: keyof ModulesCategory) => moduleType[]
    showChoiceCompanent: boolean,
    setShowChoiceCompanent: React.Dispatch<React.SetStateAction<boolean>>
    choiceCompanentContent: moduleType[]
    setchoiceCompanentContent: React.Dispatch<React.SetStateAction<moduleType[]>>
    handleShowChoiceCompanent: (categoryParam: keyof ModulesCategory) => void
    changingCategory: keyof ModulesCategory
    updateDefaultStats: (resetxp?: boolean) => void
    tankTemplates: TankType[],
    setTankTemplates: React.Dispatch<React.SetStateAction<TankType[]>>,
    handleChangeTemplates: () => void,
    updateEngineArmorLevel: (event: React.MouseEvent<HTMLButtonElement>, to: 'engine_level' | 'armor_level', operation: 'add' | 'subtract') => void
    showTankDesigner: boolean,
    setShowTankDesigner: React.Dispatch<React.SetStateAction<boolean>>
    genericTankImgs: TankGenericImgsType | undefined,
    setGenericTankImgs: React.Dispatch<React.SetStateAction<TankGenericImgsType | undefined>>
    tankNameState: string,
    setTankNameState: React.Dispatch<React.SetStateAction<string>>
    playSound: (soundName: SoundNameType) => void
    saveToLine: (TankParam: TankType, encode: boolean) => string,
    getFromLine: (line: string, options?: GetFromLineOptions) => TankType | null;
    popOutText: string,
    savedTemplates: string[],
    setSavedTemplates: React.Dispatch<React.SetStateAction<string[]>>,
    setPopOutText: React.Dispatch<React.SetStateAction<string>>,
    showPopOut: boolean,
    setShowPopOut: React.Dispatch<React.SetStateAction<boolean>>,
    ResetXpCost: () => void

}

const StateContext = createContext<StateContextType | null>(null);

export const StateProvider: React.FC<{ children: React.ReactNode }> = (
    { children }) => {
    const [modulesData, setModulesData] = useState<moduleType[]>([]);
    //pop out-------
    const [popOutText, setPopOutText] = useState<string>('Success')
    const [showPopOut, setShowPopOut] = useState<boolean>(false)
    //--------------

    const [showChoiceCompanent, setShowChoiceCompanent] = useState(false)

    const [showTankDesigner, setShowTankDesigner] = useState(false)
    const [choiceCompanentContent, setchoiceCompanentContent] = useState<moduleType[]>([])
    //god have mercy
    const [tankTemplates, setTankTemplates] = useState<TankType[]>([])

    const [defaultTank, setDefaultTank] = useState<TankType>({
        tank_role: 'light',

        tank_type: {
            'id': 123,
            'name': 'Light tank',
            'category': 'Tank Type',
            'add_stats': {
                'supply_use': 0.22
            },
            'multiply_stats': {
                'breakthrough': 0.15,
            }
        },
        chassis: {
            'id': 68,
            'name': 'Inter war chassie',
            'category': 'chassie',
            'add_stats': {
                'reliability': 0.8,
                "armor": 10,
                'hardness': 0.8,
                'maximum_speed': 4,
            },
            "type": "light"
        },
        engine: {
            'id': 1,
            "abbreviation": "gas",
            "category": "tank_engine_type",
            "sfx": "sfx_ui_sd_module_engine",
            "add_stats": {
                "build_cost_ic": 1,
                "fuel_consumption": 2,
                "maximum_speed": 0.5
            },
            "multiply_stats": {
                "maximum_speed": 0.15
            },
            "picture": "tank_module_gasoline_engine.png",
            "name": "Tank gasoline engine"
        },
        turret: {
            'id': 15,
            "abbreviation": "l1m",
            "category": "tank_light_turret_type",
            "sfx": "sfx_ui_sd_module_turret",
            "add_stats": {
                "breakthrough": 7,
                "build_cost_ic": 0.5
            },
            "dismantle_cost_ic": 0.5,
            "multiply_stats": {},
            "picture": "tank_module_light_one_man_turret.png",
            "name": "Tank light one man tank turret"
        },
        main_armament: {
            'id': 29,
            "abbreviation": "hmg",
            "category": "tank_small_main_armament",
            "sfx": "sfx_ui_sd_module_turret",
            "add_stats": {
                "soft_attack": 8,
                "hard_attack": 2,
                "ap_attack": 6,
                "build_cost_ic": 0.5
            },
            "picture": "tank_module_heavy_machine_gun.png",
            "name": "Tank heavy machine gun"
        },
        armore: {
            'id': 5,
            "abbreviation": "riv",
            "category": "tank_armor_type",
            "sfx": "sfx_ui_sd_module_sonar",
            "add_stats": {
                "defense": 2,
                "build_cost_ic": 2,
                "breakthrough": 2
            },
            "multiply_stats": {
            },
            "picture": "tank_module_riveted_armor.png",
            "name": "Tank riveted armor"
        },
        suspension: {
            'id': 11,
            "abbreviation": "bog",
            "category": "tank_suspension_type",
            "sfx": "sfx_ui_sd_module_sonar",
            "add_stats": {},
            "dismantle_cost_ic": 1,
            "picture": "tank_module_bogie_suspension.png",
            "name": "Tank bogie suspension"
        },
        armor_level: 0,
        engine_level: 0,
        defalt_stats: {
            hard_attack: 0,
            soft_attack: 0,
            defense: 0,
            ap_attack: 0,
            supply_use: 0,
            maximum_speed: 0,
            breakthrough: 0,
            reliability: 0,
            piercing: 0,
            fuel_consumption: 0,
            armor: 0,
            air_attack: 0,
            fuel_capacity: 0,
            fuel_usage: 0,
            suppresion: 0,
            reconnaissance: 0,
            entrenchment: 0,
            build_cost_ic: 0,
            hardness: 0,
            xp_cost: 0,

        },

    })
    const [savedTemplates, setSavedTemplates] = useState<string[]>([])

    const [changingCategory, setChangingCatgory] = useState<keyof ModulesCategory>('armore')

    const [genericTankImgs, setGenericTankImgs] = useState<TankGenericImgsType | undefined>()

    const handleShowChoiceCompanent = (categoryParam: keyof ModulesCategory) => {
        setShowChoiceCompanent(true)
        setChangingCatgory(categoryParam)
        setchoiceCompanentContent(getModulesByCategory(categoryParam))
    }

    const [tankNameState, setTankNameState] = useState<string>('Tank')

    const special_slot_category: string[] = [
        'tank_special_module',
        'tank_secondary_turret',
        'tank_radio_module'
    ]
    type savedTankType = {
        engine: number,
        main_armament?: number,
        turret: number,
        armore: number,
        suspension: number,
        chassis: number,
        special_slot_1?: number,
        special_slot_2?: number,
        special_slot_3?: number,
        special_slot_4?: number,
        armor_level: number,
        engine_level: number,
        tank_main_img?: string
        tank_name: string
        tank_role: string
    }
    const getModuleById = (id: number | undefined, resetxp: boolean = false): moduleType | undefined => {
        if (id) {
            var module = modulesData.find(mod => mod.id === id);
            if (resetxp && module) {
                module = {
                    ...module,
                    xp_cost: 0
                };
            }
            return module
        }
        return undefined
    };

    const saveToLine = (TankParam: TankType, encode: boolean = false): string => {
        const savedTank: savedTankType = {
            engine: TankParam.engine.id,
            main_armament: TankParam.main_armament?.id,
            turret: TankParam.turret.id,
            armore: TankParam.armore.id,
            suspension: TankParam.suspension.id,
            chassis: TankParam.chassis.id,
            special_slot_1: TankParam.special_slot_1?.id,
            special_slot_2: TankParam.special_slot_2?.id,
            special_slot_3: TankParam.special_slot_3?.id,
            special_slot_4: TankParam.special_slot_4?.id,
            armor_level: TankParam.armor_level,
            engine_level: TankParam.engine_level,
            tank_main_img: TankParam.chassis.picture,
            tank_name: TankParam.chassis.name,
            tank_role: TankParam.tank_role
        }
        if (encode) {
            return btoa(JSON.stringify(savedTank))
        }
        return JSON.stringify(savedTank)
    }
    //load from line
    const getFromLine = (line: string, options: GetFromLineOptions = {}): TankType | null => {
        try {
            //kinda bad ngl
            const parsedTank: savedTankType = options.encoded ? JSON.parse(atob(line)) : JSON.parse(line);
            const engine = getModuleById(parsedTank['engine'], options.resetXp);
            const turret = getModuleById(parsedTank['turret'], options.resetXp);
            const armore = getModuleById(parsedTank['armore'], options.resetXp)
            const suspension = getModuleById(parsedTank['suspension'], options.resetXp)
            var chassis = getModuleById(parsedTank['chassis'], options.resetXp)
            if (chassis) {
                chassis = {
                    ...chassis,
                    picture: parsedTank['tank_main_img'],
                    name: parsedTank['tank_name']
                };

            }
            if (!engine || !turret || !armore || !suspension || !chassis) {
                alert('Error loading from line')
                throw new Error("Error loading parsing modules");
            }
            const newParsedTank: TankType = {
                engine: engine,
                turret: turret,
                armore: armore,
                suspension: suspension,
                chassis: chassis,
                main_armament: getModuleById(parsedTank['main_armament'], options.resetXp),
                armor_level: parsedTank['armor_level'],
                engine_level: parsedTank['engine_level'],
                special_slot_1: getModuleById(parsedTank['special_slot_1'], options.resetXp),
                special_slot_2: getModuleById(parsedTank['special_slot_2'], options.resetXp),
                special_slot_3: getModuleById(parsedTank['special_slot_3'], options.resetXp),
                special_slot_4: getModuleById(parsedTank['special_slot_4'], options.resetXp),
                tank_role: parsedTank['tank_role'] as TankRole
            }
            return newParsedTank
        } catch (error) {
            console.error("Error loading from line", error);
            return null; // data reading error
        }
    }
    const modulesCategory: ModulesCategory = {
        "engine": 'tank_engine_type',
        "armore": 'tank_armor_type',
        "suspension": 'tank_suspension_type',
        'turret': [
            'tank_light_turret_type',
            'tank_medium_turret_type',
            'tank_heavy_turret_type',
            'tank_super_heavy_turret_type'
        ],
        'main_armament': [
            'tank_small_main_armament',
            'tank_flamethrower',
            'tank_medium_main_armament',
            'tank_heavy_main_armament'
        ],
        "special_slot_1": special_slot_category,
        "special_slot_2": special_slot_category,
        "special_slot_3": special_slot_category,
        "special_slot_4": special_slot_category,

    }
    const updateDefaultStats = (resetxp: boolean = false) => {
        setDefaultTank(prevTank => {
            const newStats: StatsTypeReq = {
                hard_attack: 0,
                soft_attack: 0,
                defense: 0,
                ap_attack: 0,
                supply_use: 0,
                piercing: 0,
                maximum_speed: 0,
                breakthrough: 0,
                reliability: 0,
                fuel_consumption: 0,
                armor: 0,
                air_attack: 0,
                fuel_capacity: 0,
                fuel_usage: 0,
                suppresion: 0,
                reconnaissance: 0,
                entrenchment: 0,
                build_cost_ic: 0,
                hardness: 0,
                xp_cost: 0
            };
            if (prevTank['armor_level'] > 0) {
                for (let index = 0; index < prevTank['armor_level']; index++) {
                    newStats['armor'] = Number((newStats['armor'] + 2.5))
                    newStats['breakthrough'] = Number((newStats['breakthrough'] + 1.2).toFixed(1))
                    newStats['maximum_speed'] = Number((newStats['maximum_speed'] + -0.1).toFixed(1))
                    newStats['reliability'] = Number((newStats['reliability'] + -0.015))
                    newStats['build_cost_ic'] = Number((newStats['build_cost_ic'] + 0.10).toFixed(1))
                    if (!resetxp) {
                        newStats['xp_cost'] += 1
                    }
                }
            }
            if (prevTank['engine_level'] > 0) {
                for (let index = 0; index < prevTank['engine_level']; index++) {
                    newStats['fuel_capacity'] = Number((newStats['fuel_capacity'] + 0.05).toFixed(1))
                    newStats['maximum_speed'] = Number((newStats['maximum_speed'] + 0.1).toFixed(1))
                    newStats['reliability'] = Number((newStats['reliability'] + -0.015).toFixed(4))
                    newStats['build_cost_ic'] = Number((newStats['build_cost_ic'] + 0.10).toFixed(1))
                    if (!resetxp) {
                        newStats['xp_cost'] += 1
                    }
                }
            }

            for (const moduleKey in prevTank) {
                const key = moduleKey as keyof ModulesCategory;
                const module = prevTank[key];
                if (module?.add_stats) {
                    const copyModule = { ...module }
                    // add_stats
                    if (copyModule?.xp_cost && !resetxp) {
                        newStats['xp_cost'] += copyModule.xp_cost
                        copyModule.xp_cost = 0
                    }
                    for (const statKey in module?.add_stats) {
                        const statKeyTwo = statKey as keyof StatsType
                        if (newStats[statKeyTwo] !== undefined && module.add_stats[statKeyTwo]) {
                            newStats[statKeyTwo] = newStats[statKeyTwo] + module.add_stats[statKeyTwo] > 0 ? Math.round(((newStats[statKeyTwo] + module.add_stats[statKeyTwo])) * 100) / 100 : 0;
                        }
                    }
                }
                if (module?.multiply_stats) {
                    for (const statKey in module.multiply_stats) {
                        const statKeyTwo = statKey as keyof StatsType
                        if (newStats[statKeyTwo] !== undefined && module.multiply_stats[statKeyTwo]) {
                            newStats[statKeyTwo] = Math.round(((newStats[statKeyTwo] + (newStats[statKeyTwo] * module.multiply_stats[statKeyTwo]))) * 10) / 10
                        }
                    }

                }
            }
            console.log(newStats)
            return {
                ...prevTank,
                defalt_stats: newStats
            };
        });
    };
    const playSound = (soundName: SoundNameType) => {
        const sounds = {
            click: 'click_scroll.wav',
            engine: 'sfx_ui_sd_module_engine_01.wav',
            misc: 'sfx_ui_sd_module_misc_01.wav',
            sonar: 'sfx_ui_sd_module_sonar_01.wav',
            turret: 'sfx_ui_sd_module_turret_01.wav',
            default: 'sfx_ui_sd_module_engine_01.wav'
        }
        const soundFile = sounds[soundName] || sounds.default
        const audio = new Audio(`/sfx/${soundFile}`);
        audio.volume = 0.2
        audio.play();
    }
    const updateEngineArmorLevel = (event: React.MouseEvent<HTMLButtonElement>, to: 'engine_level' | 'armor_level', operation: 'add' | 'subtract') => {
        setDefaultTank(prevTank => {
            var change = 0
            switch (true) {
                case event.ctrlKey:
                    change = operation === 'add' ? 10 : -10;
                    break;
                case event.altKey:
                    change = operation === 'add' ? 5 : -5;
                    break;
                default:
                    change = operation === 'add' ? 1 : -1;
                    break;
            }
            prevTank[to] += change
            if (prevTank[to] + change > 20) {
                prevTank[to] = 20
            }
            if (prevTank[to] + change < 0) {
                prevTank[to] = 0
            }
            return prevTank;
        });

        playSound('click')
        updateDefaultStats()
    };


    const getModulesByCategory = (category: keyof ModulesCategory) => {
        const keys = modulesCategory[category];

        if (!keys) {
            return [];
        }
        const keysArray = Array.isArray(keys) ? keys : [keys];

        const result = keysArray.flatMap(key => {
            return modulesData.filter((module: moduleType) => module.category === key);
        });

        return result;
    };
    const [templateUpdateFlag, setTemplateUpdateFlag] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [modulesResponse, tankImgsResponse, chassisResponse, savedTemplatesCookie] = await Promise.all([
                    fetch('/data.json'),
                    fetch('/generic_imgs.json'),
                    fetch('/chassis_default.json'),
                    Cookies.get('savedTemplates')
                ]);

                if (!modulesResponse.ok || !tankImgsResponse.ok || !chassisResponse.ok) {
                    throw new Error('Fetch Error');
                }

                const [modulesData, tankImgsData, chassisData] = await Promise.all([
                    modulesResponse.json(),
                    tankImgsResponse.json(),
                    chassisResponse.json()
                ]);

                if (savedTemplatesCookie) {
                    setSavedTemplates(JSON.parse(savedTemplatesCookie))
                    setTemplateUpdateFlag(true)
                }
                setModulesData(modulesData);
                setGenericTankImgs(tankImgsData);
                setTankTemplates(chassisData);

            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (templateUpdateFlag) {
            updateTemplatesFromSave(savedTemplates)
        }
    }, [templateUpdateFlag])

    const ResetXpCost = () => {
        setDefaultTank(prevTank => {
            if (prevTank.defalt_stats?.xp_cost) {
                prevTank.defalt_stats.xp_cost = 0
            }
            return prevTank
        })
        updateDefaultStats(true)

    }
    const genericPictureReturn = () => {
        function getRandomInt(max: number) {
            return Math.floor(Math.random() * max);
        }

        if (genericTankImgs) {
            switch (defaultTank?.chassis.type) {
                case 'light':
                    return genericTankImgs['light'][getRandomInt(genericTankImgs['light'].length)]
                case 'medium':
                    return genericTankImgs['medium'][getRandomInt(genericTankImgs['medium'].length)]
                case 'heavy':
                    return genericTankImgs['heavy'][getRandomInt(genericTankImgs['heavy'].length)]
            }
        }
    }
    const updateTemplatesFromSave = (savedParam: string[]) => {
        const parsedTemplates: TankType[] = []
        for (let i = 0; i < savedParam.length; i++) {
            const element = savedParam[i];
            const parsedTank = getFromLine(element, { encoded: false, resetXp: true })
            if (parsedTank) {
                parsedTemplates.push(parsedTank)
            }
        }
        setTankTemplates((prevTemplates) => [...parsedTemplates, ...prevTemplates])
    }
    const handleChangeTemplates = () => {
        if (defaultTank.main_armament) {
            const editedTank = {
                ...defaultTank,
                chassis: { ...defaultTank.chassis, name: tankNameState, picture: `/generic/${genericPictureReturn()}` },
            }
            setTankTemplates(prevTemplates => [
                editedTank,
                ...prevTemplates,
            ])
            ResetXpCost()
            setSavedTemplates(prevTemplates => {
                const updatedTemplates = [saveToLine(editedTank), ...prevTemplates];
                Cookies.set('savedTemplates', JSON.stringify(updatedTemplates), { expires: 7 });
                return updatedTemplates;
            });
        }
        else {
            alert('cant save project without main armamnet')
        }
    }

    return (
        //values
        <StateContext.Provider value={{
            modulesData, setModulesData,
            defaultTank, setDefaultTank,
            getModulesByCategory,
            tankTemplates, setTankTemplates, handleChangeTemplates,
            showChoiceCompanent, setShowChoiceCompanent,
            choiceCompanentContent, setchoiceCompanentContent, handleShowChoiceCompanent, changingCategory, updateDefaultStats,
            updateEngineArmorLevel,
            showTankDesigner, setShowTankDesigner,
            genericTankImgs, setGenericTankImgs,
            tankNameState, setTankNameState,
            playSound, ResetXpCost,
            saveToLine, getFromLine,
            savedTemplates, setSavedTemplates,
            popOutText, setPopOutText, showPopOut, setShowPopOut


        }}>{children}</StateContext.Provider>
    );
}
export const useAppContext = () => {
    const context = useContext(StateContext);
    if (context === null) {
        throw new Error("useAppContext must be used within a StateProvider");
    }
    return context;
}

