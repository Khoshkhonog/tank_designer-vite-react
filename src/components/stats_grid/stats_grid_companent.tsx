import { useAppContext } from "../context/context"
const StatsGridCompanent = () => {
    const { defaultTank, showTankDesigner } = useAppContext()
    return <div style={showTankDesigner ? { 'display': 'flex' } : { "display": "none" }} className="stats-grid">
        <div className="stats-grid-column">
            <div className="stats-grid-column-title">Base Stats</div>
            <div className="stats-container">
                <div>Speed:</div>
                <div>{defaultTank.defalt_stats?.maximum_speed} km/h</div>
            </div>
            <div className="stats-container">
                <div>Reliability:</div>
                <div>{defaultTank.defalt_stats && (defaultTank.defalt_stats?.reliability * 100).toFixed(1)}%</div>
            </div>
            <div className="stats-container">
                <div>Supply use:</div>
                <div>{defaultTank.defalt_stats?.supply_use}</div>
            </div>
        </div>
        <div className="stats-grid-column">
            <div className="stats-grid-row-title">Combat Stats</div>
            <div className="stats-container">
                <div>Soft attack:</div>
                <div>{defaultTank.defalt_stats?.soft_attack}</div>
            </div>
            <div className="stats-container">
                <div>Hard attack:</div>
                <div>{defaultTank.defalt_stats?.hard_attack}</div>
            </div>
            <div className="stats-container">
                <div>Piercing:</div>
                <div>{defaultTank.defalt_stats?.ap_attack}</div>
            </div>
            <div className="stats-container">
                <div>Hardness:</div>
                <div>{defaultTank.defalt_stats && defaultTank.defalt_stats?.hardness * 100}%</div>
            </div>
            <div className="stats-container">
                <div>Armor:</div>
                <div>{defaultTank.defalt_stats?.armor}</div>
            </div>
            <div className="stats-container">
                <div>Breakthrough:</div>
                <div>{defaultTank.defalt_stats?.breakthrough}</div>
            </div>
            <div className="stats-container">
                <div>Defense:</div>
                <div>{defaultTank.defalt_stats?.defense}</div>
            </div>
            <div className="stats-container">
                <div>Air attack:</div>
                <div>{defaultTank.defalt_stats?.air_attack}</div>
            </div>
        </div>
        <div className="stats-grid-column">
            <div className="stats-grid-row-title">Misc. Stats</div>
            <div className="stats-container">
                <div>Fuel Capacity:</div>
                <div>{defaultTank.defalt_stats?.fuel_capacity}</div>
            </div>
            <div className="stats-container">
                <div>Fuel Usage:</div>
                <div>{defaultTank.defalt_stats?.fuel_consumption}</div>
            </div>
            <div className="stats-container">
                <div>Suppresion:</div>
                <div>{defaultTank.defalt_stats?.suppresion}</div>
            </div>
            <div className="stats-container">
                <div>Reconnaissance:</div>
                <div>{defaultTank.defalt_stats?.reconnaissance}</div>
            </div>
            <div className="stats-container">
                <div>Entrenchment:</div>
                <div>{defaultTank.defalt_stats?.entrenchment}</div>
            </div>
        </div>
    </div>
}
export default StatsGridCompanent