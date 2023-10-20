// FilterComponent.js

import React from "react";

function Filter({
    filterType,
    filterStatus,
    setFilterType,
    setFilterStatus,
    handleFilter,
    clearFilter
}) {
    return (
        <div >
            <div className="filter d-inline-flex p-2">
                <select className="mr-2 "
                    onChange={(e) => setFilterType(e.target.value)}
                    value={filterType}
                >
                    <option value="" style={{ width: "250px" }}>Department</option>
                    <option value="Finance">Finance</option>
                    <option value="Inventory">Inventory</option>
                    <option value="Employee">Employee</option>
                    <option value="Transport">Transport</option>
                </select>
                <select className="mr-2"
                    onChange={(e) => setFilterStatus(e.target.value)}
                    value={filterStatus}
                >
                    <option value="">Status</option>
                    <option value="Successful">Successful</option>
                    <option value="Failed">Failed</option>
                </select>

            </div>
            <button
                className="btn btnColour btn-primary mr-2"
                onClick={handleFilter}
            >
                Apply
            </button>
            <button
                className="btn btn-secondary"
                onClick={clearFilter}
            >
                Clear
            </button>
        </div>
    );
}

export default Filter;
