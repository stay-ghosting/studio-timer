import { View, Text } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'


const SelectTimeList = ({ initialValue, maxValue, setSelected, suffix }) => {

    const data = []

    for (var i = 0; i < maxValue; i++) {
        // convert to string and zero pad of number lenth 2
        let value = i.toString() + suffix;
        // add to list
        data.push(
            {
                key: i,
                value: value
            });
    }

    return (
        <SelectList

            setSelected={(val) => { setSelected(val) }}
            data={data}
            save="key"
            search={false}
            placeholder={initialValue + suffix}


            boxStyles={{
                width: 100,
                borderWidth: 0,
            }}

            dropdownItemStyles={{
                borderBottomWidth: 1,
                borderBottomColor: '#aaaaaa',
            }}

            dropdownStyles={{
                // top: 30,
                // position: 'absolute',
                width: 100,
                borderRadius: 0,
            }}
        />
    )
}

export default SelectTimeList