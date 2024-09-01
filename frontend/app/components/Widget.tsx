import WormholeConnect from '@wormhole-foundation/wormhole-connect';
import Modal from "../components/common/Modal";
import { useState } from 'react';

export default function Widget() {
    const [wModalOpen, setWModalOpen] = useState(true);
    return (
        <Modal isOpen={wModalOpen} onClose={()=>setWModalOpen(false)}>
            <iframe src='https://wormhole.xalari.com/' height={'600px'} width={'100%'}/>
        </Modal>
    )
}
