'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');

const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'

// banners

const skydropx = require ('../modules/skydropx/skydrop');

router.get(`/${cGet}`+'/consignment_notes_categories/', skydropx.getConsignmentNoteCategories);
router.get(`/${cGet}`+'/consignment_notes_subcategories/:CATEGORY_ID', skydropx.getConsignmentNoteSubcategories);
router.get(`/${cGet}`+'/consignment_notes_classes/:SUBCATEGORY_ID', skydropx.getConsignmentNoteClasses);
router.get(`/${cGet}`+'/consignment_notes_packagings', skydropx.getConsignmentNotePackagings);
router.get(`/${cGet}`+'/carriers/', skydropx.getCarriers);
router.post(`/${cPost}`+'/quotations/', skydropx.getQuotations);
router.post(`/${cPost}`+'/shipments/', skydropx.createShipment);
router.get(`/${cGet}`+'/shipments/', skydropx.getAllShipments);
router.get(`/${cGet}`+'/shipment/:ID', skydropx.getShipmentByID);
router.post(`/${cPost}`+'/labels/', skydropx.createLabel);
router.get(`/${cGet}`+'/labels/', skydropx.getLabels);
router.get(`/${cGet}`+'/label/:ID', skydropx.getLabelByID);
router.post(`/${cPost}`+'/cancel_label/', skydropx.cancelLabel);
router.get(`/${cGet}`+'/canceled_labels/', skydropx.getCanceledLabels);
module.exports = router;