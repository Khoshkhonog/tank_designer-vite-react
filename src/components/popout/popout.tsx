import { useEffect } from "react";
import { useAppContext } from "../context/context"

const PopOutCompanent = () => {
    const { popOutText, showPopOut, setShowPopOut } = useAppContext()

    useEffect(() => {
        if (showPopOut) {
            const timer = setTimeout(() => {
                setShowPopOut(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showPopOut]);

    return <div>
        {showPopOut &&
            (
                <div className="pop-out-element">{popOutText}</div>
            )
        }
    </div>

}
export default PopOutCompanent