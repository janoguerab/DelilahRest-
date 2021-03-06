const router = require("express").Router();
const { Role } = require("../../db");

// GET Obtener todos los Roles
// SELECT * FROM Roles;
router.get("/", async (req, res) => {
  const Roles = await Role.findAll();
  res.json(Roles);
});

// GET Obtener un Role por el ID
// SELECT * FROM Roles WHERE id = id;
router.get("/:id", async (req, res) => {
  const role = await Role.findByPk(req.params.id);
  if (role) {
    res.json(role);
  } else {
    res.status(404).json({
      error: "Rol no encontrado.",
    });
  }
});

// POST Crear un Role
// INSERT INTO Roles(nombre) VALUES(nombre);
router.post("/", async (req, res) => {
  const role = await Role.create(req.body)
    .then((role) => {
      res.json(role);
    })
    .catch(() => {
      res.status(409).json({
        error: "El rol ya existe",
      });
    });
});

// PUT Editar un Role
// UPDATE Roles SET nombre = nombre WHERE id = id;
router.put("/:id", async (req, res) => {
  await Role.update(req.body, {
    where: { id: req.params.id },
  })
    .then((role) => {
      res.json({ message: `se ha modificado el Role ${req.params.id}` });
    })
    .catch(() => {
      res.status(409).json({
        error: "El rol ya existe",
      });
    });
});

// DELETE Eliminar un Role
// DELETE FROM Roles WHERE id = id;
router.delete("/:id", async (req, res) => {
  await Role.destroy({
    where: { id: req.params.id },
  });
  res.json({ message: `se ha eliminado el Role ${req.params.id}` });
});

module.exports = router;
