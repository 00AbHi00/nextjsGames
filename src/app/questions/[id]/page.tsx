export default async function FunctionName({params}:{params:Promise<{id:string}>}) {
    const valId= (await params).id;
    
    return (
    <div className="grid place-items-center h-screen">  
      {valId}
    </div>
  );
}