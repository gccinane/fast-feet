class DeliveryProblemController {
  async store(req, res) {
    return res.json({ ok: true });
  }
}

export default new DeliveryProblemController();
