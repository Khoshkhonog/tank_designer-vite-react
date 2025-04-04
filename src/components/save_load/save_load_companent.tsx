import { useState } from "react"
import { useAppContext } from "../context/context"
interface SaveLoadProps {
    show: 'both' | 'load' | 'save'
}
const SaveLoadCompanent: React.FC<SaveLoadProps> = ({ show = 'both' }) => {
    const { saveToLine, getFromLine, defaultTank, setDefaultTank, setShowPopOut, setPopOutText, setShowTankDesigner, updateDefaultStats } = useAppContext()
    const [showInputLoad, setShowInputLoad] = useState(false)

    const [loadInput, setLoadInput] = useState<string>('your line')
    const handleUpdateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoadInput(event.target.value)

    }
    const saveToClipboard = () => {
        const data = saveToLine(defaultTank, true)
        navigator.clipboard.writeText(data)
        setPopOutText('Copied')
        setShowPopOut(true)
    }
    const handleLoad = () => {
        if (loadInput.length > 20 && loadInput) {
            try {
                const data = getFromLine(loadInput, { encoded: true, resetXp: false })
                if (data) {
                    setDefaultTank(data)
                    setShowTankDesigner(true)
                    updateDefaultStats()
                }

            } catch (error) {
                console.error(error)
            }

        }
    }
    const renderMainSaveLoad = () => {
        switch (show) {
            case "both":
                return <div className="save-load">
                    <input value={loadInput} onChange={handleUpdateInput} type="text" placeholder="line here" />
                    <button onClick={() => { handleLoad() }}>Load</button>
                    <button onClick={() => saveToClipboard()}>Save to clipboard</button>

                </div>
            case "load":
                return <div className="save-load">
                    <input className="transparent-input" value={loadInput} onChange={handleUpdateInput} type="text" placeholder="line here" />
                    <button onClick={() => { handleLoad() }}>Load</button>


                </div>
            case "save":
                return <div className="save-load">
                    <button className=" transparent-btn save-btn large" onClick={() => saveToClipboard()}>Copy to clipboard</button>
                </div>

        }
    }
    //too lazy to style it in hoi4 style
    return renderMainSaveLoad()
}
export default SaveLoadCompanent