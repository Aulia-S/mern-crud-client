import React, { useEffect, useState } from "react";
import { getStuffs, deleteStuff } from "../api/stuff";
import { useHistory } from "react-router-dom";

function Table() {
  /******************
   * STATE
   ******************/
  const [stuffs, setStuffs] = useState(null);
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  /******************
   * LIFECYCLE
   ******************/
  useEffect(() => {
    loadStuffs();
  }, [loading]);

  const loadStuffs = async () => {
    await getStuffs()
      .then((res) => {
        setStuffs(res.data.stuffs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /******************
   * EVENT HANDLER
   ******************/
  const handleClickRefresh = (e) => {
    loading ? setLoading(false) : setLoading(true);
  };

  const handleClickDelete = (e) => {
    const id = e.target.id;
    setLoading(true);
    deleteStuff(id)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleClickEdit = (id) => {
    history.push(`/update/${id}`);
  };

  /******************
   * RENDER
   ******************/
  return (
    <div className="container">
      <div className="text-start">
        <button
          type="button"
          className="btn rounded-pill btn-action btn-create"
          data-bs-toggle="modal"
          data-bs-target="#addItemModal"
        >
          <i className="fas fa-plus"></i> Add New!
        </button>
        <button
          type="button"
          className="btn btn-primary rounded-pill btn-action"
          onClick={handleClickRefresh}
        >
          <i className="fas fa-sync-alt"></i> Refresh
        </button>
      </div>
      <table className="table text-white">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {stuffs &&
            stuffs.map((stuff, i) => (
              <tr key={stuff._id}>
                <th scope="row">{i + 1}</th>
                <td>{stuff.name}</td>
                <td>
                  {stuff.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td>{stuff.qty}</td>
                <td>
                  <div className="row">
                    <div className="col-md d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        id={stuff._id}
                        onClick={handleClickDelete}
                      >
                        <i className="fas fa-trash-alt"></i> Delete
                      </button>
                    </div>
                    <div className="col-md d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-info btn-sm text-light"
                        onClick={() => handleClickEdit(stuff._id)}
                      >
                        <i className="fas fa-edit"></i>
                        Edit
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
