<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Task;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::filter()->order()->paginate(request()->tpp, ['*'], 'page',request()->page);
        $tasksAmount = Task::all()->count();
        $completedTasksAmount = Task::where('completed',true)->count();

        return response()->json([
            'status'=> 200,
            'tasks'=>$tasks,
            'tasksAmount'=>$tasksAmount,
            'completedTasksAmount'=>$completedTasksAmount
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:191',
            'description'=>'required',
            'destination_date'=>'required|date'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        }
        else
        {
            $task = new Task;
            $task->name = $request->input('name');
            $task->description = $request->input('description');
            $task->destination_date = $request->input('destination_date');
            $task->save();

            return $this->index();
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:191',
            'description'=>'required',
            'destination_date'=>'required|date',
            'completed' => 'required|boolean'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validationErrors'=> $validator->messages(),
            ]);
        }
        else
        {
            $task = Task::find($id);
            if($task)
            {
                $task->name = $request->input('name');
                $task->description = $request->input('description');
                $task->destination_date = $request->input('destination_date');
                $task->completed = $request->input('completed');
                $task->update();

                return $this->index();
            }
            else
            {
                return response()->json([
                    'status'=> 404,
                    'message' => 'No Task ID Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $task = Task::find($id);
        if($task){
            $isValid = Task::checkRestriction($id);

            if($isValid){
                $task->delete();
                return $this->index();
            }else{
                return response()->json([
                    'status'=> 422 ,
                    'message' => 'Days ahead restriction',
                ],422);
            }
        }else{
            return response()->json([
                'status'=> 404,
                'message' => 'No Task ID Found',
            ],404);
        }
    }

}
