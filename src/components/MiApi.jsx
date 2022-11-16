import { useState, useEffect } from "react";

//falta aplicar sort , subirlo a github, y grabar el video.


const MiApi = () => {
  ////Estados & variables
  const [dataApi, setDataApi] = useState([]); // obtiene y guarda datos de la api.
  const [dataSelect, setDataSelect] = useState([]); // contiene el arreglo del select
  const [search, setSearch] = useState(""); //contiene el arreglo del search
  const [sort, setSort] = useState(false); //condicion de uso Sort

  //estados necesarios para inputs
  const [InputSearch, setInputSearch] = useState(""); // contiene el input del searchbar

  const [select, setSelect] = useState(""); // contiene la opcion del select

  //funciones enviar data a arreglos
  const enviarSearch = (e) => {
    e.preventDefault();
    setSearch(dataApi.filter((nombre) => nombre.name == InputSearch));
    console.log(search);
    setSelect("");
    setDataSelect("");
  };
  const enviarSelect = (e) => {
    e.preventDefault();
    setDataSelect(dataApi.filter((level) => level.level == select))
    setSort(false)


  };
  const sortByName = () => {
    
    setDataSelect(dataSelect.sort((a, b) => a.name.localeCompare(b.name)))
    setSort(true)

  };


  //.-funcion capturar data en inputs
  const capturarInputSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const capturarSelect = (e) => {
    setSelect(e.target.value);
    console.log(select);
    setSearch("");
    setInputSearch("");
  };
  //use effect
  useEffect(() => {
    consultarApi();
  }, []);

  //consulta api
  async function consultarApi() {
    const res = await fetch("https://digimon-api.vercel.app/api/digimon");
    const data = await res.json();
    setDataApi(data);
  }

  return (
    <div>
      <div className="filters ms-5">
        <div className="flex">
          <div className="mb-3">
            <input
              className="form-control"
              onChange={capturarInputSearch}
              value={InputSearch}
              id="exampleFormControlInput1"
              placeholder="Search by Name"
            />
          </div>
          <div>
            <button className="btn btn-primary" onClick={enviarSearch}>
              Search!
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="dropdown">
            <select
              className="form-select"
              onChange={capturarSelect}
              aria-label="Default select example"
            >
              <option selected>Filter by Evolution Stage </option>
              <option value="Fresh">Fresh</option>
              <option value="In Training">In Training</option>
              <option value="Rookie">Rookie</option>
              <option value="Armor">Armor</option>
              <option value="Champion">Champion</option>
              <option value="Ultimate">Ultimate</option>
              <option value="Mega">Mega</option>
            </select>
          </div>
          <div>
            <button className="btn btn-primary" onClick={enviarSelect}>
              Apply Selection
            </button>
            <button className="btn btn-danger" onClick={sortByName}>
              Sort by Name
            </button>
          </div>
        </div>
      </div>
      <div className="wrap ">
        {
          //todos
          dataSelect == "" && search == ""
            ? dataApi.map((digimon) => (
                <div className="card mb-3" key={digimon.name}>
                  <a href={"https://digimon.fandom.com/wiki/" + digimon.name}>
                    <img
                      src={digimon.img}
                      className="card-img-top"
                      alt={digimon.name}
                    />
                  </a>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <h3 className="text-center">Name : {digimon.name}</h3>
                    </li>
                    <li className="list-group-item text-center">
                      Stage: {digimon.level}
                    </li>
                  </ul>
                </div>
              ))
            : //slo searchbar
            search != "" //contiene el arreglo del searchbar
            ? search.map((digimon) => (
                <div className="card mb-3" key={digimon.name}>
                  <a href={"https://digimon.fandom.com/wiki/" + digimon.name}>
                    <img
                      src={digimon.img}
                      className="card-img-top"
                      alt={digimon.name}
                    />
                  </a>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <h3 className="text-center">Name : {digimon.name}</h3>
                    </li>
                    <li className="list-group-item text-center">
                      Stage: {digimon.level}
                    </li>
                  </ul>
                </div>
              ))
            : // solo filtro
              dataSelect.map((digimon) => (
                <div className="card mb-3" key={digimon.name}>
                  <a href={"https://digimon.fandom.com/wiki/" + digimon.name}>
                    <img
                      src={digimon.img}
                      className="card-img-top"
                      alt={digimon.name}
                    />
                  </a>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <h3 className="text-center">Name : {digimon.name}</h3>
                    </li>
                    <li className="list-group-item text-center">
                      Stage: {digimon.level}
                    </li>
                  </ul>
                </div>
              ))
        }
      </div>
    </div>
  );
};

export default MiApi;
