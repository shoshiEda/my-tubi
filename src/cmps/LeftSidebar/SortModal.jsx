import React, { useState, useEffect, useRef } from 'react'

export function SortByModal({ isOpen, onClose, setFilterSort, filterSort }) {

    const modalRef = useRef()

    const [sortOptions, setSortOptions] = useState([
        { label: 'name', value: 'name', checked: false },
        { label: 'CreatedAt', value: 'CreatedAt', checked: false },

    ])

    function handleSortOptionSelected(value, checked) {
        const updatedOptions = sortOptions.map(option =>
            option.value === value ? { ...option, checked } : option
        )
        console.log("updatedOptions:", updatedOptions)
        setFilterSort(prev => ({ ...prev, sortBy: value }))
    }

    function handleClickOutside(ev) {
        if (modalRef.current && !modalRef.current.contains(ev.target)) {
            onClose()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (!isOpen) return null

    console.log('render sort')

    return (

        <div className="sort-modal" ref={modalRef}>
            {sortOptions.map(option => (
                <div key={option.value} className="modal-item">
                    <input
                        type="checkbox"
                        id={option.value}
                        checked={option.checked}
                        onChange={(ev) => handleSortOptionSelected(option.value, ev.target.checked)}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                </div>
            ))}
        </div>

    )
}
