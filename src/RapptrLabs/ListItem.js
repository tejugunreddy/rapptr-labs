import React, { useEffect, useState } from "react";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const ListItem = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [itemName, setItemName] = useState(props.name);

  const handleSave = () => {
    props.updateListItems(props.index, itemName);
    toggleEditable();
  };

  useEffect(() => {
    setItemName(props.name);
  }, [props]);

  const handleOnChange = (e) => {
    setItemName(e.target.value);
  };

  const handleDelete = () => {
    props.removeItem(props.index);
  };

  const toggleEditable = () => {
    return setIsEditable(!isEditable);
  };
  return (
    <div key={props.name}>
      {isEditable ? (
        <div className="listItems">
          <input type="text" value={itemName} onChange={handleOnChange} />
          <button
            disabled={itemName.length == 0 || itemName.length > 25}
            onClick={handleSave}
          >
            save
          </button>
        </div>
      ) : (
        <div className="listItems">
          <span>{itemName}</span>
          <div className="listActions">
            <EditIcon onClick={toggleEditable}></EditIcon>
            <DeleteIcon onClick={handleDelete}></DeleteIcon>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListItem;
