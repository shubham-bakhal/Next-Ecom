import nc from 'next-connect';
import Order from '../../../models/Order';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.patch(async (req, res) => {
  await db.connect();
  const { id, status, email } = req.body;
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: id,
      status: status,
      email_address: email,
    };
    const paidOrder = await order.save();
    await db.disconnect();

    res.send({ message: 'order paid', order: paidOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'order not found' });
  }

});

export default handler;
