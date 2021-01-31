import Category from '../models/categoryModel.js'
import slugify from 'slugify'

const create = async (req, res) => {
  const { name } = req.body
  try {
    const category = await new Category({ name, slug: slugify(name) }).save()
    res.json(category)
  } catch (error) {
    console.error(error.message)
    res.status(400).send('Greška pri kreiranju kategorije')
  }
}
const list = async (req, res) => {
  try {
    const caregories = await Category.find().sort({ createdAt: -1 }).exec()
    res.json(caregories)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Greška na serveru')
  }
}
const read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).exec()
    res.json(category)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Greška na serveru')
  }
}

const update = async (req, res) => {
  const { name } = req.body
  try {
    const updateCat = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    )
    res.json(updateCat)
  } catch (error) {
    console.error(error.message)
    res.status(400).send('Greška prilikom izmene kategorije')
  }
}
const remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec()
    res.send(deleted)
  } catch (error) {
    console.error(error.message)
    res.status(400).send('Greška prilikom brisanja kategorije')
  }
}

export { create, list, read, remove, update }
