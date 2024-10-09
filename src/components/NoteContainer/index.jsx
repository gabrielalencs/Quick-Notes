// React Icons

import { RiDeleteBinLine } from "react-icons/ri";
import { SlPencil } from "react-icons/sl";
import { LuDownload } from "react-icons/lu";


const NoteContainer = () => {
    return (
        <div className="flex-1 grid gap-10 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-y-16 lg:gap-7 min-[1589px]:grid-cols-3">
            <div className="post-it text-gray-100 max-w-[300px] md:max-w-[350px]">
                <div className="flex items-center gap-4 flex-wrap justify-between">
                    <div className="flex items-center flex-wrap gap-1 text-sm">
                        <span>08/10/2024</span>
                        <span>-</span>
                        <span>23:00</span>
                    </div>

                    <div className="bg-[#2DD4BF] px-2 py-1 rounded-lg font-semibold text-black text-sm">
                        <span>Novo</span>
                    </div>
                </div>

                <div className="mt-4">
                    <h1 className="font-medium text-xl">Texto Da TarefaTexto Da TarefaTexto Da TarefaTexto Da TarefaTexto Da TarefaTexto Da TarefaTexto Da Tarefa</h1>
                </div>

                <div className="mt-8 flex gap-7 text-[#2DD4BF] text-xl">
                    <div className="iconsContainerNote">
                        <RiDeleteBinLine />
                    </div>

                    <div className="iconsContainerNote">
                        <SlPencil />
                    </div>

                    <div className="iconsContainerNote">
                        <LuDownload />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteContainer