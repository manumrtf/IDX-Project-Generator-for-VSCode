export function ProjectCard(name:string, icon: () => string) {
    //when the name is Angular the id will be createAngularApp then we will listen to events with this name
    return (
        `
        <div class="flex max-w-[130px] flex-col items-center justify-center gap-2 rounded border border-zinc-700 py-12 cursor-pointer" name="project-card" id=${`create${name}App`}>
	    ${icon()}    
        <p>${name}</p>
	    </div>
        `
    )
}