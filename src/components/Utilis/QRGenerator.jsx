import { useContext, useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ItemsContext } from "../../contexts/ItemsContext";

export default function QRGenerator({ size = 300, fgColor = "#ffffff10", bgColor = "#00000000" }) {
  const { selectedItems } = useContext(ItemsContext);
  const origin = window.location.origin;

  const [text, setText] = useState(`${origin}/order?table=2&token=124324`);

  // useEffect(() => {
  //   if (selectedItems) {
  //     setText(JSON.stringify(selectedItems));
  //   }
  // }, [selectedItems]);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      {text && (
        <QRCodeCanvas
          value={text}
          size={size}
          fgColor={fgColor}
          bgColor={bgColor}
          level="L"
        />
      )}
    </div>
  );
}
