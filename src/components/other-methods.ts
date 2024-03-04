import { BranchIcon } from "../icons/branch";
import { FolderIcon } from "../icons/folder";
import { RecentIcon } from "../icons/recent";

export function otherMethods() {
    return (
        `
        <div class="flex w-full border-zinc-700 border rounded gap-4 px-4 py-3 mt-5 cursor-pointer" id="from-repo">
        ${BranchIcon()}
        <div>
          <p class="text-purple-400">Import from repo</p>
          <p class="text-zinc-300">Start from an existing GitHub repository</p>
        </div>
      </div>
      <div class="flex">
      <div class="mt-5 flex w-full cursor-pointer items-center gap-4 rounded border border-zinc-700 px-4 py-3 cursor-pointer" id="from-recent">
       ${RecentIcon()}
        <div>
          <p class="text-purple-400">Open Recent</p>
        </div>
      </div>
      <div class="mt-5 flex w-full cursor-pointer items-center gap-4 rounded border border-zinc-700 px-4 py-3 cursor-pointer" id="from-folder">
       ${FolderIcon()}
        <div>
          <p class="text-purple-400">Open Folder</p>
        </div>
      </div>
    </div>
        `
    )
}