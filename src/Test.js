import * as React from 'react';
import { DropDownList } from "@progress/kendo-react-dropdowns";


export const Test = () => {
    const categories = ['Bottles & Cages', 'Chains', 'Pedals', 'Tires & Tubes'];
    return(
        <DropDownList style={{
            width: "130px",
            backgroundColor: 'white',
            borderStyle: 'none',
          }}
            data={categories}
            defaultValue="Categories"
            popupSettings= {
             { height: '400px' }
            }
          />
    )
}