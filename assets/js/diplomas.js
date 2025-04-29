document.addEventListener("DOMContentLoaded", () => {
    const diplomasGrid = document.getElementById("diplomasGrid")
    const verMasBtn = document.getElementById("verMas")
    let diplomas = []
    let visibleDiplomas = 0
    const diplomasPorCarga = 8 // Número de diplomas a cargar por clic en "Ver más"
  
    // Función para cargar el archivo CSV
    function cargarCSV() {
      Papa.parse("diplomas.csv", {
        download: true,
        complete: (results) => {
          diplomas = results.data.map((row) => ({
            nombre: row[0],
            url: row[1],
            plataforma: row[2],
            fecha: row[3],
          }))
          mostrarDiplomas()
        },
      })
    }
  
    // Función para mostrar los diplomas
    function mostrarDiplomas() {
      const nuevoDiplomas = diplomas.slice(visibleDiplomas, visibleDiplomas + diplomasPorCarga)
      nuevoDiplomas.forEach((diploma) => {
        const diplomaElement = document.createElement("div")
        diplomaElement.className = "diploma"
        diplomaElement.innerHTML = `
                  <a href="${diploma.url}" target="_blank" rel="noopener noreferrer">
                      <img src="./assets/certificates/${encodeURIComponent(diploma.nombre)}.jpg" alt="Diploma de ${diploma.nombre}">
                  </a>
                  <h3>${diploma.nombre}</h3>
                  <div class="diploma-info">
                      <span>${diploma.plataforma}</span>
                      <span>${diploma.fecha}</span>
                  </div>
              `
        diplomasGrid.appendChild(diplomaElement)
      })
  
      visibleDiplomas += nuevoDiplomas.length
  
      if (visibleDiplomas >= diplomas.length) {
        verMasBtn.style.display = "none"
      }
    }
  
    // Event listener para el botón "Ver más"
    verMasBtn.addEventListener("click", mostrarDiplomas)
  
    // Cargar los diplomas iniciales
    cargarCSV()
  })
  
  