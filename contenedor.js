const fs = require("fs");
 
class Contenedor {
  constructor(fileName) {
    this._filename = fileName;
    this._readFileOrCreateNewOne();
  }
 
  async _readFileOrCreateNewOne() {
    try {
      await fs.promises.readFile(this._filename, "utf-8");
    } catch (error) {
      error.code === "ENOENT"
        ? this._createEmptyFile()
        : console.log(
            `Error Code: ${error.code} | Hubo un error inesperado intentando leer  ${this._filename}`
          );
    }
  }
 
  async _createEmptyFile() {
    fs.writeFile(this._filename, "[]", (error) => {
      error
        ? console.log(error)
        : console.log(`El archivo ${this._filename} se creo ya que no existia en el sistema`);
    });
  }
 
  async getById(id) {
    try {
      const data = await this.getData();
      const parsedData = JSON.parse(data);
 
      return parsedData.find((producto) => producto.id === id);
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | Hubo un error intentando obtener el elemento por su ID (${id})`
      );
    }
  }
 
  async deleteById(id) {
    try {
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      const objectIdToBeRemoved = parsedData.find(
        (producto) => producto.id === id
      );
 
      if (objectIdToBeRemoved) {
        const index = parsedData.indexOf(objectIdToBeRemoved);
        parsedData.splice(index, 1);
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
      } else {
        console.log(`ID ${id} does not exist in the file`);
        return null;
      }
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | Hubo un error intentando eliminar el elemento por su ID (${id})`
      );
    }
  }
 
  async save(object) {
    try {
      const allData = await this.getData();
      const parsedData = JSON.parse(allData);
 
      object.id = parsedData.length + 1;
      parsedData.push(object);
 
      await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
      return object.id;
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | Hubo un error intentando guardar un elemento`
      );
    }
  }
 
  async deleteAll() {
    try {
      await this._createEmptyFile();
    } catch (error) {
      console.log(
        `Hubo un error (${error.code}) intentando eliminar todos los elementos`
      );
    }
  }
 
  async getData() {
    const data = await fs.promises.readFile(this._filename, "utf-8");
    return data;
  }
 
  async getAll() {
    const data = await this.getData();
    return JSON.parse(data);
  }
}
 
module.exports = Contenedor;