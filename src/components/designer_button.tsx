import { useState } from "react";
type ImgKeys = 'auto' | 'duplicate' | 'upgrade';
interface ButtonProps {
    img: ImgKeys;
}
const DesignerButton: React.FC<ButtonProps> = ({ img }) => {
    const [buttonState, SetButtonState] = useState('default'); //'default', 'pressed', 'disabled'

    const handleMouseDown = () => {
        if (buttonState !== 'disabled') {
            SetButtonState('pressed');
        }
    };

    const handleMouseUp = () => {
        if (buttonState !== 'disabled') {
            SetButtonState('default');
        }
    };

    const handleDisable = () => {
        SetButtonState('disabled');
    };

    return (
        <div>
            <button title="designer-button"
                className={`transparent-btn designer-button ${buttonState} ${img}`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            />
        </div>
    );
};

export default DesignerButton;