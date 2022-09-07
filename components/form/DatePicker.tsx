import {FormLabel} from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import Image from "next/image";
import React from "react";
import "flatpickr/dist/themes/light.css";
import styles from "../styles/datePicker.module.css";

interface IComponent {
    onChange: Function;
    name: string;
    value?: string;
    label: string;
    validation?: string;
}

const DatePicker = ({onChange, name, value, label, validation}: IComponent) => {
    return (
        <div className={styles.date}>
            <FormLabel style={{fontSize: '12px', fontWeight: '600'}}>{label}</FormLabel>
            <div className="w-100 position-relative">
                <Flatpickr
                    onChange={(selectedDates, dateStr) => {
                        onChange && onChange(name, dateStr)
                    }}
                    options={{
                        dateFormat: "Y-m-d",
                        minDate: value ?? "today",
                        position: "below left",
                        disableMobile: true
                    }}/>
                <div className="position-absolute" style={{right: '10px', top: '8px'}}>
                    <Image src={`/icons/date.svg`} width={30} height={30}></Image>
                </div>
            </div>

            {
                validation &&
                <p style={{
                    position: 'absolute',
                    color: 'red',
                    textAlign: 'center',
                    marginTop: '4px',
                    fontSize: '10px',
                    letterSpacing: '1px'
                }}>{validation}</p>
            }
        </div>
    );
}

export default DatePicker;