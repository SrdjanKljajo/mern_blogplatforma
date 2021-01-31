import Tag from '../models/tagModel.js'
import slugify from 'slugify'

const create = async (req, res) => {
  const { name } = req.body
  try {
    const tag = await new Tag({ name, slug: slugify(name) }).save()
    res.json(tag)
  } catch (error) {
    console.error(error.message)
    res.status(400).send('Greška pri kreiranju taga')
  }
}
const list = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ createdAt: -1 }).exec()
    res.json(tags)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Greška na serveru')
  }
}
const read = async (req, res) => {
  try {
    const tag = await Tag.findOne({ slug: req.params.slug }).exec()
    res.json(tag)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Greška na serveru')
  }
}
const update = async (req, res) => {
  const { name } = req.body
  try {
    const updateTag = await Tag.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    )
    res.json(updateTag)
  } catch (error) {
    console.error(error.message)
    res.status(400).send('Greška prilikom izmene taga')
  }
}
const remove = async (req, res) => {
  try {
    const deleted = await Tag.findOneAndDelete({
      slug: req.params.slug,
    }).exec()
    res.send(deleted)
  } catch (error) {
    console.error(error.message)
    res.status(400).send('Greška prilikom brisanja taga')
  }
}

export { create, list, read, remove, update }
