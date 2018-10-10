import React from 'react';
import { connect } from 'react-redux';

function Filter() {
  return (
    <div>
      <div>
        <div>
          Name: <input type="text" />
        </div>
        <div>
          Sex:
          <select>
            <option>male</option>
            <option>female</option>
          </select>
        </div>
        <div>
          Name: <input type="text" />
        </div>
      </div>
    </div>
  );
}

const FilterContainer = connect(() => ({}), {})(Filter);
export { Filter };
export default FilterContainer;
